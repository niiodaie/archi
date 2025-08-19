export const APP_CONFIG = {
  name: 'VNX-Architype',
  description: 'Architectural super-app for homeowners and building professionals',
  version: '1.0.0',
  
  // URLs
  web: {
    url: process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000',
  },
  
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  
  // Features
  features: {
    arEnabled: true,
    collaborationEnabled: true,
    pdfExportEnabled: true,
    costEstimationEnabled: true,
  },
  
  // Limits
  limits: {
    maxProjectsPerOrg: 100,
    maxMembersPerOrg: 50,
    maxEventsPerProject: 1000,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  
  // Plans
  plans: {
    free: {
      name: 'Free',
      maxProjects: 3,
      maxMembers: 5,
      features: ['basic_ar', 'basic_2d'],
    },
    pro: {
      name: 'Pro',
      maxProjects: 25,
      maxMembers: 15,
      features: ['advanced_ar', 'advanced_2d', '3d_viewer', 'pdf_export'],
    },
    team: {
      name: 'Team',
      maxProjects: 100,
      maxMembers: 50,
      features: ['all_features', 'priority_support', 'advanced_collaboration'],
    },
  },
} as const

export type AppConfig = typeof APP_CONFIG
export type PlanType = keyof typeof APP_CONFIG.plans

