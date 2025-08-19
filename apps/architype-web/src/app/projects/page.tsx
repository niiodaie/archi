import { requireAuth } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase-server'
import { ProjectsContent } from '@/components/projects-content'

export default async function ProjectsPage() {
  const user = await requireAuth()
  const supabase = await createServerClient()

  // Get user's projects with organization info
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      orgs!inner(name, slug),
      events(
        id,
        event_type,
        created_at,
        v_profiles!events_user_id_fkey(display_name)
      )
    `)
    .order('updated_at', { ascending: false })

  // Get user's organizations for creating new projects
  const { data: orgs } = await supabase
    .from('orgs')
    .select('*')
    .order('name')

  return (
    <ProjectsContent 
      user={user}
      projects={projects || []}
      orgs={orgs || []}
    />
  )
}

