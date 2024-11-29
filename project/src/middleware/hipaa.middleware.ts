import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service';
import { EncryptionService } from '../services/encryption.service';
import { securityConfig } from '../config/security';
import { logger } from '../utils/logger';

const auditService = new AuditService();
const encryptionService = new EncryptionService();

export const hipaaCompliance = (): (req: Request, res: Response, next: NextFunction) => Promise<void> => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Add security headers
        res.set({
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Content-Security-Policy': "default-src 'self'",
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        // Enforce TLS
        if (!req.secure && process.env.NODE_ENV === 'production') {
            return res.redirect(301, `https://${req.headers.host}${req.url}`);
        }

        // Session timeout check
        const lastActivity = req.session?.lastActivity;
        if (lastActivity) {
            const inactiveTime = Date.now() - lastActivity;
            if (inactiveTime > securityConfig.session.duration) {
                req.session?.destroy((err) => {
                    if (err) logger.error('Session destruction error:', err);
                });
                return res.status(440).json({ message: 'Session expired' });
            }
        }
        req.session!.lastActivity = Date.now();

        // Audit logging
        if (req.user) {
            await auditService.logAccess({
                userId: req.user.userId,
                action: req.method,
                resourceType: req.baseUrl.split('/')[1],
                resourceId: req.params.id || 'none',
                details: {
                    path: req.path,
                    query: req.query
                },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent'] || 'unknown'
            });
        }

        // Encrypt sensitive response data
        const originalSend = res.send;
        res.send = async function(body: any) {
            try {
                if (body && typeof body === 'object') {
                    const { encryptedData, iv, tag } = await encryptionService.encrypt(body);
                    body = { encryptedData, iv, tag };
                }
                return originalSend.call(this, body);
            } catch (error) {
                logger.error('Response encryption error:', error);
                next(error);
            }
        };

        next();
    };
};