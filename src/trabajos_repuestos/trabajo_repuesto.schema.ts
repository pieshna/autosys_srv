import { z } from 'zod'

export const trabajoRepuestoSchema = z.object({
  id: z.string().uuid().optional(),
  trabajo_id: z.string().uuid(),
  repuesto_id: z.string().uuid(),
  cantidad: z.number().int()
})
