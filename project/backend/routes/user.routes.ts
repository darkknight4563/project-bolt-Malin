import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireRole } from '../middleware/auth';

const router = Router();
const userController = new UserController();

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/preferences', userController.getPreferences);
router.put('/preferences', userController.updatePreferences);

// Admin routes
router.get(
  '/',
  requireRole(['admin']),
  userController.getAllUsers
);

export default router;