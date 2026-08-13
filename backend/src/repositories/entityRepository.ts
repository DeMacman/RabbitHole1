import { getSession } from '../database/neo4j';
import { Entity, EntityType, SearchResult, Relationship } from '../types';
import { CreateEntityInput, UpdateEntityInput } from '../validation/entity';
import { SearchQueryInput } from '../validation/search';
import neo4j from 'neo4j-driver';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeParseJSON(value: any, fallback: any = {}): any {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function nodeToEntity(node: any): Entity {
  const props = node.properties;
  return {
    id: props.id,
    slug: props.slug,
    label: props.label,
    type: props.type as EntityType,
    description: props.description || undefined,
    summary: props.summary || undefined,
    image: props.image || undefined,
    banner: props.banner || undefined,
    aliases: props.aliases || [],
    tags: props.tags || [],
    createdAt: props.createdAt,
    updatedAt: props.updatedAt,
    metadata: safeParseJSON(props.metadata),
    wikipediaUrl: props.wikipediaUrl || undefined,
    officialWebsite: props.officialWebsite || undefined,
    socialLinks: safeParseJSON(props.socialLinks, {}),
  };
}

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

export async function createEntity(data: CreateEntityInput): Promise<Entity> {
  const session = getSession();
  try {
    const now = new Date().toISOString();
    const result = await session.run(
      `CREATE (e:Entity {
        id: $id,
        slug: $slug,
        label: $label,
        type: $type,
        description: $description,
        summary: $summary,
        image: $image,
        banner: $banner,
        aliases: $aliases,
        tags: $tags,
        createdAt: $createdAt,
        updatedAt: $updatedAt,
        metadata: $metadata,
        wikipediaUrl: $wikipediaUrl,
        officialWebsite: $officialWebsite,
        socialLinks: $socialLinks
      }) RETURN e`,
      {
        id: data.id,
        slug: data.slug,
        label: data.label,
        type: data.type,
        description: data.description || null,
        summary: data.summary || null,
        image: data.image || null,
        banner: data.banner || null,
        aliases: data.aliases || [],
        tags: data.tags || [],
        createdAt: data.createdAt || now,
        updatedAt: data.updatedAt || now,
        metadata: JSON.stringify(data.metadata || {}),
        wikipediaUrl: data.wikipediaUrl || null,
        officialWebsite: data.officialWebsite || null,
        socialLinks: JSON.stringify(data.socialLinks || {}),
      }
    );
    return nodeToEntity(result.records[0].get('e'));
  } finally {
    session.close();
  }
}

export async function getEntityBySlug(slug: string): Promise<Entity | null> {
  const session = getSession();
  try {
    const result = await session.run('MATCH (e:Entity {slug: $slug}) RETURN e', { slug });
    if (result.records.length === 0) return null;
    return nodeToEntity(result.records[0].get('e'));
  } finally {
    session.close();
  }
}

export async function getEntityById(id: string): Promise<Entity | null> {
  const session = getSession();
  try {
    const result = await session.run('MATCH (e:Entity {id: $id}) RETURN e', { id });
    if (result.records.length === 0) return null;
    return nodeToEntity(result.records[0].get('e'));
  } finally {
    session.close();
  }
}

export async function listEntities(type?: string, limit = 20, offset = 0): Promise<Entity[]> {
  const session = getSession();
  try {
    let query = 'MATCH (e:Entity)';
    const params: any = { limit: neo4j.int(limit), offset: neo4j.int(offset) };
    if (type) {
      query += ' WHERE e.type = $type';
      params.type = type;
    }
    query += ' RETURN e ORDER BY e.label SKIP $offset LIMIT $limit';
    const result = await session.run(query, params);
    return result.records.map(rec => nodeToEntity(rec.get('e')));
  } finally {
    session.close();
  }
}

export async function updateEntityBySlug(slug: string, data: UpdateEntityInput): Promise<Entity | null> {
  const session = getSession();
  try {
    const setClauses: string[] = [];
    const params: any = { slug };

    if (data.label !== undefined) { setClauses.push('e.label = $label'); params.label = data.label; }
    if (data.type !== undefined) { setClauses.push('e.type = $type'); params.type = data.type; }
    if (data.description !== undefined) { setClauses.push('e.description = $description'); params.description = data.description; }
    if (data.summary !== undefined) { setClauses.push('e.summary = $summary'); params.summary = data.summary; }
    if (data.aliases !== undefined) { setClauses.push('e.aliases = $aliases'); params.aliases = data.aliases; }
    if (data.tags !== undefined) { setClauses.push('e.tags = $tags'); params.tags = data.tags; }
    if (data.image !== undefined) { setClauses.push('e.image = $image'); params.image = data.image; }
    if (data.banner !== undefined) { setClauses.push('e.banner = $banner'); params.banner = data.banner; }
    if (data.wikipediaUrl !== undefined) { setClauses.push('e.wikipediaUrl = $wikipediaUrl'); params.wikipediaUrl = data.wikipediaUrl; }
    if (data.officialWebsite !== undefined) { setClauses.push('e.officialWebsite = $officialWebsite'); params.officialWebsite = data.officialWebsite; }
    if (data.socialLinks !== undefined) { setClauses.push('e.socialLinks = $socialLinks'); params.socialLinks = JSON.stringify(data.socialLinks); }
    if (data.metadata !== undefined) { setClauses.push('e.metadata = $metadata'); params.metadata = JSON.stringify(data.metadata); }

    setClauses.push('e.updatedAt = $updatedAt');
    params.updatedAt = new Date().toISOString();

    if (setClauses.length === 0) return getEntityBySlug(slug);

    const query = `MATCH (e:Entity {slug: $slug}) SET ${setClauses.join(', ')} RETURN e`;
    const result = await session.run(query, params);
    if (result.records.length === 0) return null;
    return nodeToEntity(result.records[0].get('e'));
  } finally {
    session.close();
  }
}

export async function deleteEntityBySlug(slug: string): Promise<boolean> {
  const session = getSession();
  try {
    const result = await session.run(
      'MATCH (e:Entity {slug: $slug}) DETACH DELETE e RETURN count(e) as deleted',
      { slug }
    );
    return result.records[0].get('deleted').toNumber() > 0;
  } finally {
    session.close();
  }
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export async function searchEntities(
  params: SearchQueryInput & { fuzzy?: boolean }
): Promise<SearchResult[]> {
  const session = getSession();
  try {
    const { q, type, limit, offset } = params;
    const fuzzySuffix = params.fuzzy ? '~' : '';
    let results: SearchResult[] = [];

    try {
      const queryParams: any = {
        q: q + fuzzySuffix,
        limit: neo4j.int(limit),
        offset: neo4j.int(offset),
      };
      let fullQuery = `CALL db.index.fulltext.queryNodes('entity_fulltext', $q) YIELD node, score WHERE node:Entity`;
      if (type) {
        fullQuery += ' AND node.type = $type';
        queryParams.type = type;
      }
      fullQuery += ' RETURN node, score ORDER BY score DESC SKIP $offset LIMIT $limit';
      const result = await session.run(fullQuery, queryParams);
      results = result.records.map(rec => ({
        entity: nodeToEntity(rec.get('node')),
        score: Number(rec.get('score')),
      }));
    } catch (e) {
      results = await basicSearch(session, q, type, limit, offset);
    }
    return results;
  } finally {
    session.close();
  }
}

async function basicSearch(
  session: any,
  q: string,
  type?: string,
  limit = 20,
  offset = 0
): Promise<SearchResult[]> {
  let query = `MATCH (e:Entity) WHERE e.label CONTAINS $q OR any(alias IN e.aliases WHERE alias CONTAINS $q) OR any(tag IN e.tags WHERE tag CONTAINS $q)`;
  const params: any = { q, limit: neo4j.int(limit), offset: neo4j.int(offset) };
  if (type) {
    query += ' AND e.type = $type';
    params.type = type;
  }
  query += ' RETURN e, 0.5 as score ORDER BY e.label SKIP $offset LIMIT $limit';
  const result = await session.run(query, params);
  return result.records.map(rec => ({
    entity: nodeToEntity(rec.get('e')),
    score: Number(rec.get('score')),
  }));
}

// ---------------------------------------------------------------------------
// Knowledge Graph (single query, ready for future depth)
// ---------------------------------------------------------------------------

export async function getEntityGraph(
  slug: string,
  depth = 1
): Promise<{
  center: Entity;
  nodes: Entity[];
  edges: Relationship[];
} | null> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (center:Entity {slug: $slug})
       OPTIONAL MATCH (center)-[r]-(neighbor:Entity)
       WITH center, r, neighbor
       ORDER BY r.weight DESC
       WITH center,
            collect(DISTINCT neighbor) AS neighbours,
            collect(DISTINCT {
              id: coalesce(r.id, elementId(r)),
              relationshipType: r.relationshipType,
              weight: r.weight,
              confidence: r.confidence,
              sourceReferences: r.sourceReferences,
              description: r.description,
              createdAt: r.createdAt,
              updatedAt: r.updatedAt,
              metadata: r.metadata,
              source: startNode(r).id,
              target: endNode(r).id
            }) AS rawEdges
       RETURN center, neighbours, rawEdges`,
      { slug }
    );

    if (result.records.length === 0) return null;
    const record = result.records[0];
    const centerNode = record.get('center');
    if (!centerNode) return null;

    const center = nodeToEntity(centerNode);
    const neighbourNodes: Entity[] = (record.get('neighbours') || [])
      .filter((n: any) => n !== null)
      .map(nodeToEntity);

    const allNodes = [center, ...neighbourNodes];
    const uniqueNodes = Array.from(new Map(allNodes.map(n => [n.id, n])).values());

    const edges: Relationship[] = (record.get('rawEdges') || [])
      .filter((e: any) => e !== null)
      .map((e: any) => ({
        id: String(e.id),
        source: e.source,
        target: e.target,
        relationshipType: e.relationshipType,
        weight: Number(e.weight),
        confidence: Number(e.confidence),
        sourceReferences: safeParseJSON(e.sourceReferences, []),
        description: e.description || undefined,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        metadata: safeParseJSON(e.metadata),
      }));

    return { center, nodes: uniqueNodes, edges };
  } finally {
    session.close();
  }
}