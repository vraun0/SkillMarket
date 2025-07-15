const { z } = require('zod');


const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  instructor: z.string(),
  tags: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  thumbnail: z.string().url().optional(),
});

const purchaseSchema = z.object({
  courseId: z.string().length(24, "Invalid course ID"),
});


module.exports = {
  courseSchema,
  purchaseSchema
}

