import { z } from 'zod'

export const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  instructor: z.string(),
  tags: z.array(z.string()),
  price: z.number().min(0),
  thumbnail: z.string().url(),
})
