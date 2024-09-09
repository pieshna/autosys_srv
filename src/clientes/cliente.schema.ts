import { z } from 'zod'

export const clienteSchema = z.object({
  id: z.string().uuid().optional(),
  usuario_id: z.string().uuid()
})
