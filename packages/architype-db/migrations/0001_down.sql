-- Rollback for 0001_init.sql
-- Drops all tables and schema created in the initial migration

-- Drop triggers
DROP TRIGGER IF EXISTS add_project_creator_as_owner_trigger ON architype.projects;
DROP TRIGGER IF EXISTS add_org_owner_as_member_trigger ON architype.orgs;

-- Drop functions
DROP FUNCTION IF EXISTS architype.add_project_creator_as_owner();
DROP FUNCTION IF EXISTS architype.add_org_owner_as_member();

-- Drop view
DROP VIEW IF EXISTS architype.v_profiles;

-- Drop tables (in reverse dependency order)
DROP TABLE IF EXISTS architype.events;
DROP TABLE IF EXISTS architype.project_members;
DROP TABLE IF EXISTS architype.projects;
DROP TABLE IF EXISTS architype.memberships;
DROP TABLE IF EXISTS architype.orgs;

-- Drop schema
DROP SCHEMA IF EXISTS architype CASCADE;

