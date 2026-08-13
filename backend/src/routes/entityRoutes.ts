import { Router } from 'express';
import * as entityController from '../controllers/entityController';

const router = Router();

router.post('/', entityController.createEntity);
router.get('/', entityController.listEntities);
router.get('/:slug', entityController.getEntityBySlug);
router.get('/:slug/graph', entityController.getEntityGraph);
router.patch('/:slug', entityController.updateEntityBySlug);
router.delete('/:slug', entityController.deleteEntityBySlug);

export default router;