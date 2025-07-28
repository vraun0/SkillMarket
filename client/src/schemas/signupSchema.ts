import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email().min(3).max(30),
  password: z.string().min(6).max(30),
  admin: z.boolean(),
})
