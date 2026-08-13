import app from './app';
import { env } from './config/env';
import { initDriver, closeDriver } from './database/neo4j';
import { initializeDatabase } from './database/initDb';
import logger from './utils/logger';

async function start() {
  try {
    await initDriver();
    await initializeDatabase();
    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await closeDriver();
  process.exit(0);
});

start();