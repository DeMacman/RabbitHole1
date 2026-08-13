import { z } from 'zod';

export const createSourceSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().optional(),
  author: z.string().optional(),
  publishedDate: z.string().datetime().optional(),
  type: z.enum(['article', 'book', 'paper', 'website', 'video', 'podcast', 'other']),
  confidence: z.number().min(0).max(1).default(1),
  metadata: z.record(z.any()).default({}),
});

export const updateSourceSchema = z.object({
  title: z.string().min(1).optional(),
  url: z.string().url().optional(),
  publisher: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  publishedDate: z.string().datetime().optional().nullable(),
  type: z.enum(['article', 'book', 'paper', 'website', 'video', 'podcast', 'other']).optional(),
  confidence: z.number().min(0).max(1).optional(),
  metadata: z.record(z.any()).optional(),
});

export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type UpdateSourceInput = z.infer<typeof updateSourceSchema>;