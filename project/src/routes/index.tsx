import { Express } from 'express';
import wellnessRoutes from './wellness.routes';
import { trackRequest } from '../middleware/analytics.middleware';
import { hipaaCompliance } from '../middleware/hipaa.middleware';

export const setupRoutes = (app: Express): void => {
    // Add HIPAA compliance middleware
    app.use(hipaaCompliance());
    
    // Add analytics middleware to track all requests
    app.use(trackRequest);

    // Setup routes
    app.use('/api/wellness', wellnessRoutes);
};