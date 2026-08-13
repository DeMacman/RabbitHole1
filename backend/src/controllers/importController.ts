import { Request, Response } from 'express';
import { importJson, importCsv } from '../import/importService';
import logger from '../utils/logger';

export async function importJsonHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await importJson(req.body);
    res.json(result);
  } catch (err: any) {
    logger.error(err, 'JSON import error');
    res.status(400).json({ error: err.message });
  }
}

export async function importCsvHandler(req: Request, res: Response): Promise<void> {
  try {
    const { type } = req.query; // entities or relationships
    if (!type || (type !== 'entities' && type !== 'relationships')) {
      res.status(400).json({ error: 'Query param type must be "entities" or "relationships"' });
      return;
    }
    // assume CSV text in body as plain text
    const csvText = req.body;
    if (typeof csvText !== 'string') {
      res.status(400).json({ error: 'Request body must be CSV text' });
      return;
    }
    const result = await importCsv(csvText, type as 'entities' | 'relationships');
    res.json(result);
  } catch (err: any) {
    logger.error(err, 'CSV import error');
    res.status(400).json({ error: err.message });
  }
}