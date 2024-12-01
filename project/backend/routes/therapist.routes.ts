import { Router } from 'express';
import { TherapistController } from '../controllers/therapist.controller';
import { requireRole } from '../middleware/auth';

const router = Router();
const therapistController = new TherapistController();

router.get('/', therapistController.getAllTherapists);
router.get('/:id', therapistController.getTherapistById);
router.get('/:id/availability', therapistController.getTherapistAvailability);

// Protected routes for therapists
router.put(
  '/availability',
  requireRole(['therapist']),
  therapistController.updateAvailability
);

router.get(
  '/appointments/upcoming',
  requireRole(['therapist']),
  therapistController.getUpcomingAppointments
);

export default router;