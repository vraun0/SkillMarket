import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().min(3).max(30),
  password: z.string().min(3).max(30),
  admin: z.boolean(),
})
