import { getSession } from '../database/neo4j';
import { Source } from '../types';
import { CreateSourceInput, UpdateSourceInput } from '../validation/source';
import { v4 as uuidv4 } from 'uuid';

export async function createSource(data: CreateSourceInput): Promise<Source> {
  const session = getSession();
  const id = data.id || uuidv4();
  const result = await session.run(
    `CREATE (s:Source {
      id: $id,
      title: $title,
      url: $url,
      publisher: $publisher,
      author: $author,
      publishedDate: $publishedDate,
      type: $type,
      confidence: $confidence,
      metadata: $metadata
    }) RETURN s`,
    {
      id,
      title: data.title,
      url: data.url,
      publisher: data.publisher || null,
      author: data.author || null,
      publishedDate: data.publishedDate || null,
      type: data.type,
      confidence: data.confidence,
      metadata: JSON.stringify(data.metadata || {}),
    }
  );
  session.close();
  const node = result.records[0].get('s').properties;
  return {
    id: node.id,
    title: node.title,
    url: node.url,
    publisher: node.publisher,
    author: node.author,
    publishedDate: node.publishedDate,
    type: node.type,
    confidence: node.confidence,
    metadata: JSON.parse(node.metadata || '{}'),
  };
}

export async function getSource(id: string): Promise<Source | null> {
  const session = getSession();
  const result = await session.run('MATCH (s:Source {id: $id}) RETURN s', { id });
  session.close();
  if (result.records.length === 0) return null;
  return nodeToSource(result.records[0].get('s').properties);
}

function nodeToSource(props: any): Source {
  return {
    id: props.id,
    title: props.title,
    url: props.url,
    publisher: props.publisher,
    author: props.author,
    publishedDate: props.publishedDate,
    type: props.type,
    confidence: props.confidence,
    metadata: JSON.parse(props.metadata || '{}'),
  };
}
// ... update/delete/list similarly.