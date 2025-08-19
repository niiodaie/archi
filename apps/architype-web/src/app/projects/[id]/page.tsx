import { requireAuth } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { ProjectDetailContent } from '@/components/project-detail-content'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const user = await requireAuth()
  const supabase = await createServerClient()

  // Get project with organization and events
  const { data: project } = await supabase
    .from('projects')
    .select(`
      *,
      orgs!inner(name, slug),
      events(
        id,
        event_type,
        event_data,
        created_at,
        v_profiles!events_user_id_fkey(display_name)
      )
    `)
    .eq('id', id)
    .single()

  if (!project) {
    notFound()
  }

  // Get project members
  const { data: members } = await supabase
    .from('project_members')
    .select(`
      *,
      v_profiles!project_members_user_id_fkey(display_name, email)
    `)
    .eq('project_id', id)

  return (
    <ProjectDetailContent 
      user={user}
      project={project}
      members={members || []}
    />
  )
}

