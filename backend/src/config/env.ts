import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NEO4J_URI: z.string().refine(
    (value) =>
      value.startsWith('bolt://') ||
      value.startsWith('bolt+s://') ||
      value.startsWith('bolt+ssc://') ||
      value.startsWith('neo4j://') ||
      value.startsWith('neo4j+s://') ||
      value.startsWith('neo4j+ssc://'),
    {
      message: 'Invalid Neo4j URI',
    }
  ),

  NEO4J_USER: z.string().min(1),

  NEO4J_PASSWORD: z.string().min(1),

  PORT: z.coerce.number().default(3001),

  LOG_LEVEL: z.string().default('info'),
});

export const env = envSchema.parse(process.env);