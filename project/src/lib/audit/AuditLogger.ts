import { createLogger, format, transports } from 'winston';

interface AuditLogEntry {
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  status: string;
  details?: Record<string, unknown>;
}

export class AuditLogger {
  private logger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.File({ filename: 'audit.log' }),
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple()
          )
        })
      ]
    });
  }

  async logAccess(entry: AuditLogEntry): Promise<void> {
    this.logger.info('Access Log', {
      ...entry,
      type: 'ACCESS',
      timestamp: new Date().toISOString()
    });
  }

  async logDataAccess(entry: AuditLogEntry): Promise<void> {
    this.logger.info('Data Access', {
      ...entry,
      type: 'DATA_ACCESS',
      timestamp: new Date().toISOString()
    });
  }

  async logSecurityEvent(entry: AuditLogEntry): Promise<void> {
    this.logger.warn('Security Event', {
      ...entry,
      type: 'SECURITY',
      timestamp: new Date().toISOString()
    });
  }
}