import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { validateAppointment } from '../validators/appointment.validator';

const router = Router();
const appointmentController = new AppointmentController();

router.post('/', validateAppointment, appointmentController.createAppointment);
router.get('/upcoming', appointmentController.getUpcomingAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id/cancel', appointmentController.cancelAppointment);
router.put('/:id/reschedule', validateAppointment, appointmentController.rescheduleAppointment);

export default router;