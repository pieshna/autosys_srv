import { z } from 'zod'

export const trabajadorSchema = z.object({
  id: z.string().uuid().optional(),
  especialidad: z.string().max(255),
  porcentaje: z.number(),
  usuario_id: z.string().uuid()
})
