import { pool } from '../config/database';
import { logger } from '../utils/logger';

export interface AuditLog {
    userId: string;
    action: string;
    resourceType: string;
    resourceId: string;
    details: Record<string, any>;
    ipAddress: string;
    userAgent: string;
}

export class AuditService {
    async logAccess(log: AuditLog): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO audit_logs 
                (user_id, action, resource_type, resource_id, details, ip_address, user_agent)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    log.userId,
                    log.action,
                    log.resourceType,
                    log.resourceId,
                    log.details,
                    log.ipAddress,
                    log.userAgent
                ]
            );
        } catch (error) {
            logger.error('Audit logging error:', error);
            throw error;
        }
    }

    async getAccessLogs(
        resourceType: string,
        resourceId: string,
        startDate: Date,
        endDate: Date
    ): Promise<AuditLog[]> {
        try {
            const result = await pool.query(
                `SELECT * FROM audit_logs 
                WHERE resource_type = $1 
                AND resource_id = $2 
                AND created_at BETWEEN $3 AND $4
                ORDER BY created_at DESC`,
                [resourceType, resourceId, startDate, endDate]
            );
            return result.rows;
        } catch (error) {
            logger.error('Audit log retrieval error:', error);
            throw error;
        }
    }
}