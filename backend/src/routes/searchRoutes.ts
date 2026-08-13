import { Router } from 'express';
import { searchEntities } from '../controllers/entityController';

const router = Router();

router.get('/', searchEntities);

export default router;