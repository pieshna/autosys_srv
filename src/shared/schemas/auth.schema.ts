import { z } from 'zod'

export const authSchemaRegister = z.object({
  id: z.string().uuid().optional(),
  correo: z.string().email(),
  usuario: z.string().max(20),
  password: z.string().max(255),
  estado: z.boolean().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export const authSchemaLogin = z.object({
  correo: z.string(),
  password: z.string()
})
