import { z } from 'zod'

export const trabajoSchema = z.object({
  id: z.string().uuid().optional(),
  trabajador_id: z.string().uuid(),
  vehiculo_id: z.string().uuid(),
  descripcion: z.string().max(255).optional(),
  problema_cliente: z.string().max(255).optional(),
  diagnostico_mecanico: z.string().max(255).optional(),
  total_pagar: z.number().optional()
})
