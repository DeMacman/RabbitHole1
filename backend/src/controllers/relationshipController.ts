import { Request, Response } from 'express';
import * as relationshipService from '../services/relationshipService';
import { createRelationshipSchema, updateRelationshipSchema } from '../validation/relationship';
import logger from '../utils/logger';

export async function createRelationship(req: Request, res: Response): Promise<void> {
  try {
    const data = createRelationshipSchema.parse(req.body);
    const rel = await relationshipService.createRelationship(data);
    res.status(201).json(rel);
  } catch (err: any) {
    logger.error(err, 'Create relationship error');
    res.status(400).json({ error: err.message });
  }
}

export async function listRelationships(req: Request, res: Response): Promise<void> {
  try {
    const entityId = req.query.entityId as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    const rels = await relationshipService.getRelationships(entityId, limit, offset);
    res.json(rels);
  } catch (err: any) {
    logger.error(err, 'List relationships error');
    res.status(500).json({ error: err.message });
  }
}

export async function updateRelationship(req: Request, res: Response): Promise<void> {
  try {
    const data = updateRelationshipSchema.parse(req.body);
    const { sourceId, targetId } = req.params;
    const rel = await relationshipService.updateRelationship(sourceId, targetId, data);
    res.json(rel);
  } catch (err: any) {
    logger.error(err, 'Update relationship error');
    res.status(400).json({ error: err.message });
  }
}

export async function deleteRelationship(req: Request, res: Response): Promise<void> {
  try {
    const { sourceId, targetId } = req.params;
    const success = await relationshipService.deleteRelationship(sourceId, targetId);
    if (!success) {
      res.status(404).json({ error: 'Relationship not found' });
      return;
    }
    res.status(204).send();
  } catch (err: any) {
    logger.error(err, 'Delete relationship error');
    res.status(500).json({ error: err.message });
  }
}