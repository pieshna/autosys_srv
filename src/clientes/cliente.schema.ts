import { z } from 'zod'
import { usuarioSchema } from '../usuario/usuario.schema'

export const clienteSchema = z.object({
  id: z.string().uuid().optional(),
  usuario_id: z.string().uuid().optional()
})

export const nuevoClienteUsuarioSchema = clienteSchema.merge(usuarioSchema)
