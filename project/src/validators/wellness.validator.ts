import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/errors';

const progressSchema = z.object({
    tool_id: z.string().uuid(),
    duration_minutes: z.number().min(0).optional(),
    notes: z.string().optional(),
    mood_rating: z.number().min(1).max(5).optional(),
    effectiveness_rating: z.number().min(1).max(5).optional()
});

export const validateProgress = (req: Request, _res: Response, next: NextFunction) => {
    try {
        progressSchema.parse(req.body);
        next();
    } catch (error) {
        next(new ValidationError('Invalid progress data'));
    }
};