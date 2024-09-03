import { z } from 'zod'

export const usuarioRolSchema = z.object({
  id: z.string().uuid().optional(),
  usuario_id: z.string().uuid(),
  rol_id: z.string().uuid()
})
