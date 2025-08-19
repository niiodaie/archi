import { z } from 'zod'

export const OrganizationPlan = z.enum(['free', 'pro', 'team'])
export const MembershipRole = z.enum(['owner', 'admin', 'member'])

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(50).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
})

export const UpdateOrganizationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/).optional(),
  plan: OrganizationPlan.optional(),
})

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  owner_id: z.string().uuid(),
  plan: OrganizationPlan,
  created_at: z.string(),
  updated_at: z.string(),
})

export const MembershipSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: MembershipRole,
  created_at: z.string(),
})

export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>
export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>
export type Organization = z.infer<typeof OrganizationSchema>
export type Membership = z.infer<typeof MembershipSchema>
export type OrganizationPlanType = z.infer<typeof OrganizationPlan>
export type MembershipRoleType = z.infer<typeof MembershipRole>

