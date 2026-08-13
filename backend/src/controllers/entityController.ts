import { Request, Response } from 'express';
import * as entityService from '../services/entityService';
import { createEntitySchema, updateEntitySchema } from '../validation/entity';
import { searchQuerySchema } from '../validation/search';
import logger from '../utils/logger';

export async function createEntity(req: Request, res: Response): Promise<void> {
  try {
    const data = createEntitySchema.parse(req.body);
    const entity = await entityService.createEntity(data);
    res.status(201).json(entity);
  } catch (err: any) {
    logger.error(err, 'Create entity error');
    res.status(400).json({ error: err.message });
  }
}

export async function getEntityBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const entity = await entityService.getEntityBySlug(slug);
    if (!entity) {
      res.status(404).json({ error: 'Entity not found' });
      return;
    }
    res.json(entity);
  } catch (err: any) {
    logger.error(err, 'Get entity error');
    res.status(500).json({ error: err.message });
  }
}

export async function listEntities(req: Request, res: Response): Promise<void> {
  try {
    const type = req.query.type as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    const entities = await entityService.listEntities(type, limit, offset);
    res.json(entities);
  } catch (err: any) {
    logger.error(err, 'List entities error');
    res.status(500).json({ error: err.message });
  }
}

export async function updateEntityBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const data = updateEntitySchema.parse(req.body);
    const entity = await entityService.updateEntityBySlug(slug, data);
    res.json(entity);
  } catch (err: any) {
    logger.error(err, 'Update entity error');
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEntityBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const success = await entityService.deleteEntityBySlug(slug);
    if (!success) {
      res.status(404).json({ error: 'Entity not found' });
      return;
    }
    res.status(204).send();
  } catch (err: any) {
    logger.error(err, 'Delete entity error');
    res.status(500).json({ error: err.message });
  }
}

export async function searchEntities(req: Request, res: Response): Promise<void> {
  try {
    const params = searchQuerySchema.parse(req.query);
    const results = await entityService.searchEntities({ ...params, fuzzy: true });
    res.json(results);
  } catch (err: any) {
    logger.error(err, 'Search error');
    res.status(400).json({ error: err.message });
  }
}

export async function getEntityGraph(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const graph = await entityService.getEntityGraph(slug);
    if (!graph) {
      res.status(404).json({ error: 'Entity not found' });
      return;
    }
    res.json(graph);
  } catch (err: any) {
    logger.error(err, 'Graph fetch error');
    res.status(500).json({ error: err.message });
  }
}