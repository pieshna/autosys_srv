import { z } from 'zod'

export const valeTrabajoSchema = z.object({
  id: z.string().uuid().optional(),
  vale_id: z.string().uuid(),
  trabajo_id: z.string().uuid()
})
