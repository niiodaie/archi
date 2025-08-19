export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  architype: {
    Tables: {
      orgs: {
        Row: {
          id: string
          name: string
          slug: string
          owner_id: string
          plan: 'free' | 'pro' | 'team'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          owner_id: string
          plan?: 'free' | 'pro' | 'team'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          owner_id?: string
          plan?: 'free' | 'pro' | 'team'
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          org_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          org_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          id?: string
          org_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          org_id: string
          name: string
          description: string | null
          status: 'active' | 'archived' | 'deleted'
          ar_data: Json
          layout_data: Json
          cost_estimate: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          org_id: string
          name: string
          description?: string | null
          status?: 'active' | 'archived' | 'deleted'
          ar_data?: Json
          layout_data?: Json
          cost_estimate?: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          org_id?: string
          name?: string
          description?: string | null
          status?: 'active' | 'archived' | 'deleted'
          ar_data?: Json
          layout_data?: Json
          cost_estimate?: number
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: 'owner' | 'editor' | 'viewer'
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          role?: 'owner' | 'editor' | 'viewer'
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          role?: 'owner' | 'editor' | 'viewer'
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          project_id: string
          user_id: string
          event_type: string
          event_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          event_type: string
          event_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          event_type?: string
          event_data?: Json
          created_at?: string
        }
      }
    }
    Views: {
      v_profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          display_name: string
          avatar_url: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

