export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

// Common API endpoints
export const API_ENDPOINTS = {
  // Organizations
  ORGANIZATIONS: '/api/organizations',
  ORGANIZATION_BY_ID: (id: string) => `/api/organizations/${id}`,
  ORGANIZATION_MEMBERS: (id: string) => `/api/organizations/${id}/members`,
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
  PROJECT_EVENTS: (id: string) => `/api/projects/${id}/events`,
  PROJECT_MEMBERS: (id: string) => `/api/projects/${id}/members`,
  
  // Events
  EVENTS: '/api/events',
  
  // Auth
  AUTH_SESSION: '/api/auth/session',
  AUTH_LOGOUT: '/api/auth/logout',
} as const

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS]

