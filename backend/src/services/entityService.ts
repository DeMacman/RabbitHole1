import * as entityRepo from '../repositories/entityRepository';
import { CreateEntityInput, UpdateEntityInput } from '../validation/entity';
import { Entity, SearchResult, Relationship } from '../types';
import { SearchQueryInput } from '../validation/search';

export async function createEntity(data: CreateEntityInput): Promise<Entity> {
  const existing = await entityRepo.getEntityById(data.id);
  if (existing) throw new Error(`Entity with id ${data.id} already exists`);
  return entityRepo.createEntity(data);
}

export async function getEntityBySlug(slug: string): Promise<Entity | null> {
  return entityRepo.getEntityBySlug(slug);
}

export async function listEntities(type?: string, limit = 20, offset = 0): Promise<Entity[]> {
  return entityRepo.listEntities(type, limit, offset);
}

export async function updateEntityBySlug(slug: string, data: UpdateEntityInput): Promise<Entity | null> {
  const entity = await entityRepo.getEntityBySlug(slug);
  if (!entity) throw new Error('Entity not found');
  return entityRepo.updateEntityBySlug(slug, data);
}

export async function deleteEntityBySlug(slug: string): Promise<boolean> {
  return entityRepo.deleteEntityBySlug(slug);
}

export async function searchEntities(params: SearchQueryInput): Promise<SearchResult[]> {
  return entityRepo.searchEntities(params);
}

export async function getEntityGraph(slug: string): Promise<{
  center: Entity;
  nodes: Entity[];
  edges: Relationship[];
} | null> {
  return entityRepo.getEntityGraph(slug);
}