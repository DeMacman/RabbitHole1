import { getSession } from '../database/neo4j';
import { Relationship } from '../types';
import { CreateRelationshipInput, UpdateRelationshipInput } from '../validation/relationship';
import { v4 as uuidv4 } from 'uuid';
import neo4j from 'neo4j-driver';

function relationshipFromRecord(rec: any): Relationship {
  const r = rec.get('r').properties;
  return {
    id: r.id,
    source: rec.get('sourceId'),
    target: rec.get('targetId'),
    relationshipType: r.relationshipType,
    weight: r.weight,
    confidence: r.confidence,
    sourceReferences: r.sourceReferences || [],
    description: r.description,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    metadata: JSON.parse(r.metadata || '{}'),
  };
}

export async function createRelationship(data: CreateRelationshipInput): Promise<Relationship> {
  const session = getSession();
  const id = data.id || uuidv4();
  const now = new Date().toISOString();

  const exists = await session.run(
    'MATCH (s:Entity {id: $source}), (t:Entity {id: $target}) RETURN s, t',
    { source: data.source, target: data.target }
  );
  if (exists.records.length === 0) {
    session.close();
    throw new Error('Source or target entity not found');
  }

  const result = await session.run(
    `MATCH (s:Entity {id: $source}), (t:Entity {id: $target})
     CREATE (s)-[r:RELATES {
       id: $id,
       relationshipType: $relationshipType,
       weight: $weight,
       confidence: $confidence,
       sourceReferences: $sourceReferences,
       description: $description,
       createdAt: $createdAt,
       updatedAt: $updatedAt,
       metadata: $metadata
     }]->(t)
     RETURN r, s.id as sourceId, t.id as targetId`,
    {
      source: data.source,
      target: data.target,
      id,
      relationshipType: data.relationshipType,
      weight: data.weight,
      confidence: data.confidence,
      sourceReferences: data.sourceReferences || [],
      description: data.description || null,
      createdAt: data.createdAt || now,
      updatedAt: data.updatedAt || now,
      metadata: JSON.stringify(data.metadata || {}),
    }
  );
  session.close();
  return relationshipFromRecord(result.records[0]);
}

export async function getRelationships(entityId?: string, limit = 20, offset = 0): Promise<Relationship[]> {
  const session = getSession();
  let query: string;
  const params: any = { limit: neo4j.int(limit), offset: neo4j.int(offset) };

  if (entityId) {
    query = `
      MATCH (s:Entity {id: $entityId})-[r:RELATES]->(t:Entity)
      RETURN s.id as sourceId, t.id as targetId, r
      UNION
      MATCH (s:Entity)-[r:RELATES]->(t:Entity {id: $entityId})
      RETURN s.id as sourceId, t.id as targetId, r
      SKIP $offset LIMIT $limit
    `;
    params.entityId = entityId;
  } else {
    query = `
      MATCH (s:Entity)-[r:RELATES]->(t:Entity)
      RETURN s.id as sourceId, t.id as targetId, r
      SKIP $offset LIMIT $limit
    `;
  }

  const result = await session.run(query, params);
  session.close();
  return result.records.map(rec => relationshipFromRecord(rec));
}

export async function updateRelationship(
  sourceId: string,
  targetId: string,
  data: UpdateRelationshipInput
): Promise<Relationship | null> {
  const session = getSession();
  const setClauses: string[] = [];
  const params: any = { sourceId, targetId };

  if (data.relationshipType !== undefined) {
    setClauses.push('r.relationshipType = $relationshipType');
    params.relationshipType = data.relationshipType;
  }
  if (data.weight !== undefined) {
    setClauses.push('r.weight = $weight');
    params.weight = data.weight;
  }
  if (data.confidence !== undefined) {
    setClauses.push('r.confidence = $confidence');
    params.confidence = data.confidence;
  }
  if (data.sourceReferences !== undefined) {
    setClauses.push('r.sourceReferences = $sourceReferences');
    params.sourceReferences = data.sourceReferences;
  }
  if (data.description !== undefined) {
    setClauses.push('r.description = $description');
    params.description = data.description;
  }
  if (data.metadata !== undefined) {
    setClauses.push('r.metadata = $metadata');
    params.metadata = JSON.stringify(data.metadata);
  }
  setClauses.push('r.updatedAt = $updatedAt');
  params.updatedAt = new Date().toISOString();

  if (setClauses.length === 0) return getRelationshipById(sourceId, targetId);

  const query = `
    MATCH (s:Entity {id: $sourceId})-[r:RELATES]->(t:Entity {id: $targetId})
    SET ${setClauses.join(', ')}
    RETURN s.id as sourceId, t.id as targetId, r
  `;
  const result = await session.run(query, params);
  session.close();
  if (result.records.length === 0) return null;
  return relationshipFromRecord(result.records[0]);
}

export async function deleteRelationship(sourceId: string, targetId: string): Promise<boolean> {
  const session = getSession();
  const result = await session.run(
    `MATCH (s:Entity {id: $sourceId})-[r:RELATES]->(t:Entity {id: $targetId}) DELETE r RETURN count(r) as deleted`,
    { sourceId, targetId }
  );
  session.close();
  return result.records[0].get('deleted').toNumber() > 0;
}

async function getRelationshipById(sourceId: string, targetId: string): Promise<Relationship | null> {
  const session = getSession();
  const result = await session.run(
    `MATCH (s:Entity {id: $sourceId})-[r:RELATES]->(t:Entity {id: $targetId})
     RETURN s.id as sourceId, t.id as targetId, r`,
    { sourceId, targetId }
  );
  session.close();
  if (result.records.length === 0) return null;
  return relationshipFromRecord(result.records[0]);
}