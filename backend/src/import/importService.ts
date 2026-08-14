import { getSession } from '../database/neo4j';
import { createEntitySchema } from '../validation/entity';
import { createRelationshipSchema } from '../validation/relationship';
import logger from '../utils/logger';

interface ImportResult {
  entitiesCreated: number;
  relationshipsCreated: number;
  errors: string[];
}

export async function importJson(payload: any): Promise<ImportResult> {
  const session = getSession();
  const txc = session.beginTransaction();

  const result: ImportResult = {
    entitiesCreated: 0,
    relationshipsCreated: 0,
    errors: [],
  };

  try {
    // Process entities
    if (payload.entities) {
      for (const entityData of payload.entities) {
        try {
          const parsed = createEntitySchema.parse(entityData);

          const exists = await txc.run(
            'MATCH (e:Entity {id: $id}) RETURN e',
            { id: parsed.id }
          );

          if (exists.records.length > 0) {
            result.errors.push(
              `Entity ${parsed.id} already exists, skipped`
            );
            continue;
          }

          await txc.run(
            `CREATE (e:Entity {
              id: $id,
              label: $label,
              type: $type,
              description: $description,
              aliases: $aliases,
              image: $image,
              metadata: $metadata
            })`,
            {
              id: parsed.id,
              label: parsed.label,
              type: parsed.type,
              description: parsed.description || null,
              aliases: parsed.aliases || [],
              image: parsed.image || null,
              metadata: JSON.stringify(parsed.metadata || {}),
            }
          );

          result.entitiesCreated++;
        } catch (err: any) {
          result.errors.push(
            `Entity ${entityData.id}: ${err.message}`
          );
        }
      }
    }

    // Process relationships
    if (payload.relationships) {
      for (const relData of payload.relationships) {
        try {
          const parsed = createRelationshipSchema.parse(relData);

          await txc.run(
            `MATCH (s:Entity {id: $source}), (t:Entity {id: $target})
             CREATE (s)-[r:RELATES {
               relationshipType: $relationshipType,
               weight: $weight,
               metadata: $metadata
             }]->(t)`,
            {
              source: parsed.source,
              target: parsed.target,
              relationshipType: parsed.relationshipType,
              weight: parsed.weight,
              metadata: JSON.stringify(parsed.metadata || {}),
            }
          );

          result.relationshipsCreated++;
        } catch (err: any) {
          result.errors.push(
            `Relationship ${relData.source}->${relData.target}: ${err.message}`
          );
        }
      }
    }

    await txc.commit();

    logger.info(
      `Import completed: ${result.entitiesCreated} entities, ${result.relationshipsCreated} relationships`
    );
  } catch (error) {
    await txc.rollback();
    logger.error(error, 'Import failed, rolled back');
    throw error;
  } finally {
    session.close();
  }

  return result;
}

export async function importCsv(
  csvText: string,
  type: 'entities' | 'relationships'
): Promise<ImportResult> {
  // Basic CSV parser (assuming first line headers)
  const lines = csvText.trim().split('\n');

  if (lines.length < 2) {
    throw new Error('CSV must have header and data rows');
  }

  const headers = lines[0].split(',').map(h => h.trim());

  const rows = lines
    .slice(1)
    .map(line => line.split(',').map(field => field.trim()));

  let payload: any;

  if (type === 'entities') {
    // Expected:
    // id,label,type,description,aliases(semicolon separated),image,metadata(JSON)

    const entities = rows.map(row => {
      const obj: any = {};

      headers.forEach((h, i) => {
        obj[h] = row[i] || undefined;
      });

      if (obj.aliases) {
        obj.aliases = obj.aliases
          .split(';')
          .map((a: string) => a.trim());
      }

      if (obj.metadata) {
        obj.metadata = JSON.parse(obj.metadata);
      }

      return obj;
    });

    payload = { entities };
  } else {
    // Relationships:
    // source,target,relationshipType,weight,metadata

    const relationships = rows.map(row => {
      const obj: any = {};

      headers.forEach((h, i) => {
        obj[h] = row[i] || undefined;
      });

      if (obj.weight) {
        obj.weight = parseFloat(obj.weight);
      }

      if (obj.metadata) {
        obj.metadata = JSON.parse(obj.metadata);
      }

      return obj;
    });

    payload = { relationships };
  }

  return importJson(payload);
}