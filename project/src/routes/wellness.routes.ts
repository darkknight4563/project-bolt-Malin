import { Router } from 'express';
import { WellnessController } from '../controllers/wellness.controller';
import { authenticateJWT } from '../middleware/auth';
import { validateProgress } from '../validators/wellness.validator';

const router = Router();
const wellnessController = new WellnessController();

// Public routes
router.get('/categories', wellnessController.getCategories);
router.get('/tools', wellnessController.getWellnessTools);
router.get('/resources', wellnessController.getResources);

// Protected routes
router.post('/progress', authenticateJWT, validateProgress, wellnessController.trackProgress);
router.get('/progress', authenticateJWT, wellnessController.getUserProgress);

export default router;