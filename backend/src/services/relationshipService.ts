import * as relationshipRepo from '../repositories/relationshipRepository';
import { CreateRelationshipInput, UpdateRelationshipInput } from '../validation/relationship';
import { Relationship } from '../types';

export async function createRelationship(data: CreateRelationshipInput): Promise<Relationship> {
  return relationshipRepo.createRelationship(data);
}

export async function getRelationships(entityId?: string, limit = 20, offset = 0): Promise<Relationship[]> {
  return relationshipRepo.getRelationships(entityId, limit, offset);
}

export async function updateRelationship(
  sourceId: string,
  targetId: string,
  data: UpdateRelationshipInput
): Promise<Relationship | null> {
  const rel = await relationshipRepo.updateRelationship(sourceId, targetId, data);
  if (!rel) throw new Error('Relationship not found');
  return rel;
}

export async function deleteRelationship(sourceId: string, targetId: string): Promise<boolean> {
  return relationshipRepo.deleteRelationship(sourceId, targetId);
}