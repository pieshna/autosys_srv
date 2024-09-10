import { z } from 'zod'

export const authSchemaRegister = z.object({
  id: z.string().uuid().optional(),
  correo: z.string().email(),
  nombre: z.string().max(255),
  apellido: z.string().max(255),
  username: z.string().max(20),
  password: z.string().max(255),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export const authSchemaLogin = z.object({
  correo: z.string(),
  password: z.string()
})
