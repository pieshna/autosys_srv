import { z } from 'zod'

export const usuarioDetalleSchema = z.object({
  id: z.string().uuid().optional(),
  usuario_id: z.string().uuid(),
  nombre: z.string().max(50),
  apellido: z.string().max(50),
  fecha_nacimiento: z.date(),
  foto: z.string().max(255).optional()
})
