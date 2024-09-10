import { z } from 'zod'

export const valeSchema = z.object({
  id: z.string().uuid().optional(),
  repuesto_id: z.string().uuid(),
  precio: z.number(),
  proveedor: z.string(),
  cantidad: z.number().int()
})
