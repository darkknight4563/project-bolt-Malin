import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

const appointmentSchema = z.object({
  therapistId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  notes: z.string().optional()
}).refine(data => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  return end > start;
}, {
  message: "End time must be after start time"
});

export const validateAppointment = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    appointmentSchema.parse(req.body);
    next();
  } catch (error) {
    next(new ValidationError('Invalid appointment data'));
  }
};