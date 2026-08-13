import { Router } from 'express';
import { importJsonHandler, importCsvHandler } from '../controllers/importController';

const router = Router();

router.post('/json', importJsonHandler);
router.post('/csv', importCsvHandler);

export default router;