import { z } from 'zod'

export const repuestoSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string().max(255),
  precio: z.number(),
  lugar: z.string().max(255)
})
