import { z } from 'zod'

export const registroTiemposSchema = z.object({
  id: z.string().uuid().optional(),
  trabajo_id: z.string().uuid(),
  hora_inicio: z.date().transform((val) => new Date(val)),
  hora_finalizacion: z.date().transform((val) => new Date(val))
})
