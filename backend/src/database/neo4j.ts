import neo4j, { Driver, Session } from 'neo4j-driver';
import { env } from '../config/env';
import logger from '../utils/logger';

let driver: Driver;

export async function initDriver(): Promise<void> {
  driver = neo4j.driver(
    env.NEO4J_URI,
    neo4j.auth.basic(env.NEO4J_USER, env.NEO4J_PASSWORD),
    { maxConnectionLifetime: 3 * 60 * 60 * 1000, maxConnectionPoolSize: 50 }
  );
  
  const serverInfo = await driver.getServerInfo();
  logger.info(`Neo4j connected to ${serverInfo.address}`);
}

export function getDriver(): Driver {
  if (!driver) throw new Error('Neo4j driver not initialized');
  return driver;
}

export function getSession(database?: string): Session {
  return getDriver().session({ database });
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    logger.info('Neo4j driver closed');
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    const session = getSession();
    await session.run('RETURN 1');
    session.close();
    return true;
  } catch (error) {
    return false;
  }
}