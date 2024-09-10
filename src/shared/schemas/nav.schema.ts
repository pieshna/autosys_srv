import { z } from 'zod'

export const navSchema = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string().min(1),
  url: z.string().min(1),
  icono: z.string().optional(),
  parent_id: z.string().uuid().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})
