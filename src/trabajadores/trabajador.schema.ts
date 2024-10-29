import { z } from 'zod'

export const trabajadorSchema = z.object({
  id: z.string().uuid().optional(),
  especialidad: z.string().max(255),
  porcentaje: z.number(),
  usuario_id: z.string().uuid().optional(),
  username: z.string().max(50).optional(),
  password: z.string().max(100).optional(),
  correo: z.string().email().optional(),
  nombre: z.string().max(50).optional(),
  apellido: z.string().max(50).optional(),
  telefono: z.number().optional(),
  direccion: z.string().max(100).optional(),
  dpi: z.number().optional()
})
