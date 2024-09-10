import { z } from 'zod'

export const usuarioSchema = z.object({
  id: z.string().uuid().optional(),
  username: z.string().max(50).optional(),
  password: z.string().max(100),
  correo: z.string().email().optional(),
  nombre: z.string().max(50),
  apellido: z.string().max(50),
  rol_id: z.string().uuid()
})

export const nuevoUsuarioSchema = usuarioSchema.extend({
  fecha_nacimiento: z.date(),
  foto: z.string().optional()
})
