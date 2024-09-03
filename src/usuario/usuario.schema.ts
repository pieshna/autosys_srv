import { z } from 'zod'

export const usuarioSchema = z.object({
  id: z.string().uuid().optional(),
  username: z.string().max(50).optional(),
  password: z.string().max(100),
  email: z.string().email().optional(),
  estado: z.boolean().optional()
})

export const nuevoUsuarioSchema = usuarioSchema.extend({
  nombre: z.string().max(50),
  apellido: z.string().max(50),
  fecha_nacimiento: z.date(),
  foto: z.string().optional()
})
