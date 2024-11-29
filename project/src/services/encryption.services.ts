import crypto from 'crypto';
import { securityConfig } from '../config/security';
import { logger } from '../utils/logger';

export class EncryptionService {
    private readonly config = securityConfig.encryption;

    async encrypt(data: any): Promise<{ encryptedData: string; iv: string; tag: string }> {
        try {
            const iv = crypto.randomBytes(this.config.ivLength);
            const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
            
            const cipher = crypto.createCipheriv(
                this.config.algorithm,
                key,
                iv,
                { authTagLength: this.config.tagLength }
            );

            const encrypted = Buffer.concat([
                cipher.update(JSON.stringify(data), 'utf8'),
                cipher.final()
            ]);

            const tag = cipher.getAuthTag();

            return {
                encryptedData: encrypted.toString('base64'),
                iv: iv.toString('base64'),
                tag: tag.toString('base64')
            };
        } catch (error) {
            logger.error('Encryption error:', error);
            throw new Error('Data encryption failed');
        }
    }

    async decrypt(encryptedData: string, iv: string, tag: string): Promise<any> {
        try {
            const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
            const decipher = crypto.createDecipheriv(
                this.config.algorithm,
                key,
                Buffer.from(iv, 'base64'),
                { authTagLength: this.config.tagLength }
            );

            decipher.setAuthTag(Buffer.from(tag, 'base64'));

            const decrypted = Buffer.concat([
                decipher.update(Buffer.from(encryptedData, 'base64')),
                decipher.final()
            ]);

            return JSON.parse(decrypted.toString('utf8'));
        } catch (error) {
            logger.error('Decryption error:', error);
            throw new Error('Data decryption failed');
        }
    }
}