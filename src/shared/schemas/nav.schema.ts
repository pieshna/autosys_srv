import { z } from 'zod'

export const navSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  link: z.string().min(1),
  icon: z.string().optional(),
  parent_id: z.string().uuid().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})
