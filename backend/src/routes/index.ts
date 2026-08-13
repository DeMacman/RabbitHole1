import { Router } from 'express';
import entityRoutes from './entityRoutes';
import relationshipRoutes from './relationshipRoutes';
import searchRoutes from './searchRoutes';
import importRoutes from './importRoutes';

const router = Router();

router.use('/entities', entityRoutes);
router.use('/relationships', relationshipRoutes);
router.use('/search', searchRoutes);
router.use('/import', importRoutes);
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;