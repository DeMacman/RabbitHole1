import { initDriver, closeDriver } from '../database/neo4j';
import { initializeDatabase } from '../database/initDb';
import { seedDatabase } from './seed';

async function main() {
  await initDriver();
  await initializeDatabase();
  await seedDatabase();
  await closeDriver();
  console.log('Seed completed');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});