import { requireAuth } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase-server'
import { DashboardContent } from '@/components/dashboard-content'

export default async function DashboardPage() {
  const user = await requireAuth()
  const supabase = await createServerClient()

  // Get user's organizations
  const { data: orgs } = await supabase
    .from('orgs')
    .select('*')
    .order('created_at', { ascending: false })

  // Get recent projects
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      orgs!inner(name)
    `)
    .eq('status', 'active')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <DashboardContent 
      user={user}
      orgs={orgs || []}
      recentProjects={projects || []}
    />
  )
}

