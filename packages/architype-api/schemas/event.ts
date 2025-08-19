import { z } from 'zod'

export const CreateEventSchema = z.object({
  project_id: z.string().uuid('Invalid project ID'),
  event_type: z.string().min(1, 'Event type is required'),
  event_data: z.record(z.any()).optional(),
})

export const EventSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  user_id: z.string().uuid(),
  event_type: z.string(),
  event_data: z.record(z.any()),
  created_at: z.string(),
})

// Common event types
export const EventTypes = {
  PROJECT_CREATED: 'project_created',
  PROJECT_UPDATED: 'project_updated',
  PROJECT_ARCHIVED: 'project_archived',
  AR_SESSION_STARTED: 'ar_session_started',
  AR_SESSION_COMPLETED: 'ar_session_completed',
  LAYOUT_UPDATED: 'layout_updated',
  COST_ESTIMATE_UPDATED: 'cost_estimate_updated',
  MEMBER_ADDED: 'member_added',
  MEMBER_REMOVED: 'member_removed',
} as const

export type CreateEvent = z.infer<typeof CreateEventSchema>
export type Event = z.infer<typeof EventSchema>
export type EventType = typeof EventTypes[keyof typeof EventTypes]

