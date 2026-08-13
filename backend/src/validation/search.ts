import { z } from 'zod';

export const searchQuerySchema = z.object({
  q: z.string().min(1),
  type: z.string().optional(), // optional entity type filter
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;