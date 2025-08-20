import { getAuthServer, getMockUser, dbEnabled } from './db'
import { redirect } from 'next/navigation'

export async function getUser() {
  const auth = await getAuthServer()
  const { data: { user }, error } = await auth.getUser()

  if (error || !user) {
    return getMockUser() // Return mock user if auth is disabled or user not found
  }
  
  return user
}

export async function requireAuth() {
  const user = await getUser()
  
  if (!user && dbEnabled) {
    redirect('/auth/login')
  }
  
  return user
}

