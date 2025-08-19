'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  Plus, 
  Settings, 
  LogOut, 
  FolderOpen,
  Clock,
  Users,
  BarChart3
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface DashboardContentProps {
  user: User
  orgs: any[]
  recentProjects: any[]
}

export function DashboardContent({ user, orgs, recentProjects }: DashboardContentProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/')
  }

  const displayName = user.user_metadata?.full_name || user.email

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">VNX-Architype</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {displayName}</span>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your projects and organizations</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            href="/projects/new"
            className="bg-indigo-600 text-white p-6 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">New Project</h3>
            <p className="text-indigo-100">Start a new architectural project</p>
          </Link>
          
          <Link 
            href="/organizations"
            className="bg-white border border-gray-200 p-6 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Users className="h-8 w-8 text-gray-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizations</h3>
            <p className="text-gray-600">Manage your teams and workspaces</p>
          </Link>
          
          <Link 
            href="/settings"
            className="bg-white border border-gray-200 p-6 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-8 w-8 text-gray-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600">Configure your account preferences</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{recentProjects.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Organizations</p>
                <p className="text-2xl font-bold text-gray-900">{orgs.length}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{recentProjects.filter(p => p.status === 'active').length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Recent projects */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
              <Link 
                href="/projects" 
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Create your first project to get started</p>
                <Link 
                  href="/projects/new"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.orgs?.name}</p>
                        {project.description && (
                          <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(project.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

