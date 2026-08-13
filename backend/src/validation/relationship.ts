import { z } from 'zod';

export const createRelationshipSchema = z.object({
  id: z.string().min(1).optional(),
  source: z.string().min(1),
  target: z.string().min(1),
  relationshipType: z.string().min(1),
  weight: z.number().min(0).max(1).default(0.5),
  confidence: z.number().min(0).max(1).default(0.5),
  sourceReferences: z.array(z.string()).default([]),
  description: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).default({}),
});

export const updateRelationshipSchema = z.object({
  relationshipType: z.string().min(1).optional(),
  weight: z.number().min(0).max(1).optional(),
  confidence: z.number().min(0).max(1).optional(),
  sourceReferences: z.array(z.string()).optional(),
  description: z.string().optional().nullable(),
  updatedAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional(),
});

export type CreateRelationshipInput = z.infer<typeof createRelationshipSchema>;
export type UpdateRelationshipInput = z.infer<typeof updateRelationshipSchema>;