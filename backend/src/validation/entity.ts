import { z } from 'zod';

const entityTypeEnum = z.enum([
  'Person', 'Company', 'Technology', 'Concept', 'Book', 'Movie',
  'Country', 'City', 'University', 'Programming Language', 'Paper',
  'Historical Event', 'Organization', 'Space Mission'
]);

export const createEntitySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: z.string().min(1),
  type: entityTypeEnum,
  description: z.string().optional(),
  summary: z.string().optional(),
  image: z.string().url().optional(),
  banner: z.string().url().optional(),
  aliases: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).default({}),
  wikipediaUrl: z.string().url().optional(),
  officialWebsite: z.string().url().optional(),
  socialLinks: z.record(z.string().url()).default({}),
});

export const updateEntitySchema = z.object({
  label: z.string().min(1).optional(),
  type: entityTypeEnum.optional(),
  description: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
  banner: z.string().url().optional().nullable(),
  aliases: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  updatedAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional(),
  wikipediaUrl: z.string().url().optional().nullable(),
  officialWebsite: z.string().url().optional().nullable(),
  socialLinks: z.record(z.string().url()).optional(),
});

export type CreateEntityInput = z.infer<typeof createEntitySchema>;
export type UpdateEntityInput = z.infer<typeof updateEntitySchema>;