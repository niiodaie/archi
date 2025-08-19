'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  ArrowLeft,
  Settings,
  Users,
  Activity,
  DollarSign,
  Calendar,
  Edit,
  Share,
  Download
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface ProjectDetailContentProps {
  user: User
  project: any
  members: any[]
}

export function ProjectDetailContent({ user, project, members }: ProjectDetailContentProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUpdateProject = async () => {
    // Placeholder for project update functionality
    console.log('Update project:', project.id)
  }

  const handleShareProject = async () => {
    // Placeholder for project sharing functionality
    console.log('Share project:', project.id)
  }

  const handleExportPDF = async () => {
    // Placeholder for PDF export functionality
    console.log('Export PDF for project:', project.id)
  }

  const formatEventType = (eventType: string) => {
    return eventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'project_created':
        return <Building2 className="h-4 w-4" />
      case 'ar_session_started':
      case 'ar_session_completed':
        return <Activity className="h-4 w-4" />
      case 'layout_updated':
        return <Edit className="h-4 w-4" />
      case 'cost_estimate_updated':
        return <DollarSign className="h-4 w-4" />
      case 'member_added':
      case 'member_removed':
        return <Users className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/projects" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <Building2 className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-sm text-gray-600">{project.orgs?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShareProject}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              
              <button
                onClick={handleExportPDF}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              
              <button
                onClick={handleUpdateProject}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">${project.cost_estimate || 0}</p>
                  <p className="text-sm text-gray-600">Estimated Cost</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Activity className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{project.events?.length || 0}</p>
                  <p className="text-sm text-gray-600">Activities</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{members.length}</p>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
              </div>
              
              {project.description && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              )}
            </div>

            {/* AR Data */}
            {Object.keys(project.ar_data || {}).length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">AR Data</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(project.ar_data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Layout Data */}
            {Object.keys(project.layout_data || {}).length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Layout Data</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(project.layout_data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Updated</span>
                  <span className="text-gray-900">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {member.v_profiles?.display_name || member.v_profiles?.email}
                      </p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {project.events?.slice(0, 5).map((event: any) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getEventIcon(event.event_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {formatEventType(event.event_type)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.v_profiles?.display_name} • {new Date(event.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {(!project.events || project.events.length === 0) && (
                  <p className="text-gray-500 text-sm">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

