import { Router } from 'express';
import * as relController from '../controllers/relationshipController';

const router = Router();

router.post('/', relController.createRelationship);
router.get('/', relController.listRelationships);
router.patch('/:sourceId/:targetId', relController.updateRelationship);
router.delete('/:sourceId/:targetId', relController.deleteRelationship);

export default router;