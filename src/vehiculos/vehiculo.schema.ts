import { z } from 'zod'

export const vehiculoSchema = z.object({
  id: z.string().uuid().optional(),
  cliente_id: z.string().uuid(),
  marca: z.string().max(255),
  modelo: z.string().max(255),
  anio: z.number(),
  placa: z.string().max(255)
})
