import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsService } from 
added 2 packages, and audited 133 packages in 2s

17 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
;
import { logger } from '../utils/logger';

// Extend Express Request to include user
declare module 'express' {
    interface Request {
        user?: {
            userId: string;
        };
    }
}

interface AnalyticsEvent {
    eventType: string;
    userId?: string;
    timestamp: Date;
    properties: {
        path: string;
        method: string;
        statusCode: number;
        duration: number;
        userAgent?: string;
        ip: string;
    };
    sessionId: string;
}

const analyticsService = new AnalyticsService();

export const trackRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const startTime = Date.now();
    const sessionId = req.headers['x-session-id'] as string || uuidv4();

    // Add session ID to response headers
    res.setHeader('x-session-id', sessionId);

    // Store original end function
    const originalEnd = res.end;

    // Override end function
    res.end = function (chunk?: any, encoding?: any, cb?: any) {
        const endTime = Date.now();
        const duration = endTime - startTime;

        const analyticsEvent: AnalyticsEvent = {
            eventType: 'api_request',
            userId: req.user?.userId,
            timestamp: new Date(),
            properties: {
                path: req.path,
                method: req.method,
                statusCode: res.statusCode,
                duration,
                userAgent: req.headers['user-agent'],
                ip: req.ip
            },
            sessionId
        };

        analyticsService.storeEvent(analyticsEvent)
            .catch((error: any) => logger.error('Analytics tracking error:', error));

        // Call original end function
        return originalEnd.call(this, chunk, encoding, cb);
    };

    next();
};