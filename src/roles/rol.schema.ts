import { z } from 'zod'

export const rolSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string().max(255)
})
