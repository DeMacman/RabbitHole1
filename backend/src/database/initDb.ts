import { getSession } from './neo4j';
import logger from '../utils/logger';

export async function initializeDatabase(): Promise<void> {
  const session = getSession();
  try {
    await session.run('CREATE CONSTRAINT entity_id_unique IF NOT EXISTS FOR (e:Entity) REQUIRE e.id IS UNIQUE');
    await session.run('CREATE CONSTRAINT entity_slug_unique IF NOT EXISTS FOR (e:Entity) REQUIRE e.slug IS UNIQUE');
    await session.run('CREATE INDEX entity_type IF NOT EXISTS FOR (e:Entity) ON (e.type)');

    // Drop old index if it exists, then create the full‑text index
    try { await session.run('DROP INDEX entity_label_fulltext IF EXISTS'); } catch {}
    await session.run(`
      CREATE FULLTEXT INDEX entity_fulltext IF NOT EXISTS
      FOR (e:Entity)
      ON EACH [e.label, e.aliases, e.tags, e.summary]
    `);

    logger.info('Database constraints and full‑text index created');
  } catch (error) {
    logger.error(error, 'Failed to initialise database');
    throw error;
  } finally {
    session.close();
  }
}