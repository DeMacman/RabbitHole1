import { z } from 'zod';

export const importJsonSchema = z.object({
  entities: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum([...] as any), // we'll reuse entity type enum
    description: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    image: z.string().optional(),
    metadata: z.record(z.any()).optional(),
  })).optional(),
  relationships: z.array(z.object({
    source: z.string(),
    target: z.string(),
    relationship: z.string(),
    weight: z.number().min(0).max(1).optional(),
    metadata: z.record(z.any()).optional(),
  })).optional(),
});

export type ImportJsonPayload = z.infer<typeof importJsonSchema>;