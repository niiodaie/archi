import { z } from 'zod'

export const ProjectStatus = z.enum(['active', 'archived', 'deleted'])

export const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().optional(),
  org_id: z.string().uuid('Invalid organization ID'),
})

export const UpdateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  status: ProjectStatus.optional(),
  ar_data: z.record(z.any()).optional(),
  layout_data: z.record(z.any()).optional(),
  cost_estimate: z.number().min(0).optional(),
})

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  status: ProjectStatus,
  ar_data: z.record(z.any()),
  layout_data: z.record(z.any()),
  cost_estimate: z.number(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type CreateProject = z.infer<typeof CreateProjectSchema>
export type UpdateProject = z.infer<typeof UpdateProjectSchema>
export type Project = z.infer<typeof ProjectSchema>
export type ProjectStatusType = z.infer<typeof ProjectStatus>

