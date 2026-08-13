// backend/src/seed/expandedSeed.ts
import { getSession } from '../database/neo4j';
import { v4 as uuidv4 } from 'uuid';
import { createEntitySchema } from '../validation/entity';
import { createRelationshipSchema } from '../validation/relationship';

const session = getSession();

// Helpers to generate data
function slugify(text: string): string { ... }

// Define arrays of entity templates
const techCompanies = ['Apple', 'Google', 'Microsoft', 'Amazon', 'Meta', ...];
// ... other categories

async function seed() {
  // Generate 500 entities with batches
  // Generate 5000 relationships between them
  // Use MERGE to avoid duplicates
}