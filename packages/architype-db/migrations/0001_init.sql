-- VNX-Architype Initial Schema Migration
-- Creates the core tables for organizations, projects, and events

-- Enable RLS
ALTER DATABASE postgres SET row_security = on;

-- Create architype schema
CREATE SCHEMA IF NOT EXISTS architype;

-- Organizations table
CREATE TABLE architype.orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization memberships
CREATE TABLE architype.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES architype.orgs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- Projects table
CREATE TABLE architype.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES architype.orgs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  ar_data JSONB DEFAULT '{}',
  layout_data JSONB DEFAULT '{}',
  cost_estimate DECIMAL(10,2) DEFAULT 0,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project members
CREATE TABLE architype.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES architype.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Events table for activity feed
CREATE TABLE architype.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES architype.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles view (combines auth.users with additional data)
CREATE OR REPLACE VIEW architype.v_profiles AS
SELECT 
  u.id,
  u.email,
  u.created_at,
  u.updated_at,
  COALESCE(u.raw_user_meta_data->>'full_name', u.email) as display_name,
  u.raw_user_meta_data->>'avatar_url' as avatar_url
FROM auth.users u;

-- Row Level Security Policies

-- Orgs: Users can only see orgs they're members of
ALTER TABLE architype.orgs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view orgs they belong to" ON architype.orgs
  FOR SELECT USING (
    id IN (
      SELECT org_id FROM architype.memberships 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update orgs they own" ON architype.orgs
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can insert orgs" ON architype.orgs
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Memberships: Users can see memberships for orgs they belong to
ALTER TABLE architype.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view memberships for their orgs" ON architype.memberships
  FOR SELECT USING (
    org_id IN (
      SELECT org_id FROM architype.memberships 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Org owners can manage memberships" ON architype.memberships
  FOR ALL USING (
    org_id IN (
      SELECT id FROM architype.orgs 
      WHERE owner_id = auth.uid()
    )
  );

-- Projects: Users can see projects for orgs they belong to
ALTER TABLE architype.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view projects for their orgs" ON architype.projects
  FOR SELECT USING (
    org_id IN (
      SELECT org_id FROM architype.memberships 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create projects in their orgs" ON architype.projects
  FOR INSERT WITH CHECK (
    org_id IN (
      SELECT org_id FROM architype.memberships 
      WHERE user_id = auth.uid()
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Project members can update projects" ON architype.projects
  FOR UPDATE USING (
    id IN (
      SELECT project_id FROM architype.project_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- Project members: Users can see members for projects they have access to
ALTER TABLE architype.project_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view project members for accessible projects" ON architype.project_members
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM architype.projects p
      WHERE p.org_id IN (
        SELECT org_id FROM architype.memberships 
        WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Project owners can manage project members" ON architype.project_members
  FOR ALL USING (
    project_id IN (
      SELECT project_id FROM architype.project_members 
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

-- Events: Users can see events for projects they have access to
ALTER TABLE architype.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view events for accessible projects" ON architype.events
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM architype.projects p
      WHERE p.org_id IN (
        SELECT org_id FROM architype.memberships 
        WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create events for accessible projects" ON architype.events
  FOR INSERT WITH CHECK (
    project_id IN (
      SELECT id FROM architype.projects p
      WHERE p.org_id IN (
        SELECT org_id FROM architype.memberships 
        WHERE user_id = auth.uid()
      )
    ) AND user_id = auth.uid()
  );

-- Indexes for performance
CREATE INDEX idx_memberships_user_id ON architype.memberships(user_id);
CREATE INDEX idx_memberships_org_id ON architype.memberships(org_id);
CREATE INDEX idx_projects_org_id ON architype.projects(org_id);
CREATE INDEX idx_project_members_user_id ON architype.project_members(user_id);
CREATE INDEX idx_project_members_project_id ON architype.project_members(project_id);
CREATE INDEX idx_events_project_id ON architype.events(project_id);
CREATE INDEX idx_events_created_at ON architype.events(created_at DESC);

-- Functions for automatic project membership
CREATE OR REPLACE FUNCTION architype.add_project_creator_as_owner()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO architype.project_members (project_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_project_creator_as_owner_trigger
  AFTER INSERT ON architype.projects
  FOR EACH ROW
  EXECUTE FUNCTION architype.add_project_creator_as_owner();

-- Function for automatic org membership
CREATE OR REPLACE FUNCTION architype.add_org_owner_as_member()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO architype.memberships (org_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_org_owner_as_member_trigger
  AFTER INSERT ON architype.orgs
  FOR EACH ROW
  EXECUTE FUNCTION architype.add_org_owner_as_member();

