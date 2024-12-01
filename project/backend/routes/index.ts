import { Express } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import therapistRoutes from './therapist.routes';
import appointmentRoutes from './appointment.routes';
import { authenticateJWT } from '../middleware/auth';

export const setupRoutes = (app: Express): void => {
  // Health check
  app.get('/health', (_, res) => res.status(200).json({ status: 'healthy' }));

  // Public routes
  app.use('/api/auth', authRoutes);

  // Protected routes
  app.use('/api/users', authenticateJWT, userRoutes);
  app.use('/api/therapists', authenticateJWT, therapistRoutes);
  app.use('/api/appointments', authenticateJWT, appointmentRoutes);
};