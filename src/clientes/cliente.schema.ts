import { z } from 'zod'

export const clienteSchema = z.object({
  id: z.string().uuid().optional(),
  usuario_id: z.string().uuid().optional(),
  telefono: z.number().optional(),
  direccion: z.string().max(100).optional()
})

export const nuevoClienteUsuarioSchema = z.object({
  usuario_id: z.string().uuid().optional(),
  username: z.string().max(50).optional(),
  password: z.string().max(100).optional(),
  correo: z.string().email().optional(),
  nombre: z.string().max(50).optional(),
  apellido: z.string().max(50).optional(),
  telefono: z.number().optional(),
  direccion: z.string().max(100).optional()
})
