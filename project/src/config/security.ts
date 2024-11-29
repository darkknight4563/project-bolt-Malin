export const securityConfig = {
    encryption: {
        algorithm: 'aes-256-gcm',
        keyLength: 32,
        ivLength: 16,
        tagLength: 16,
        saltLength: 64,
        iterations: 100000,
    },
    session: {
        duration: 15 * 60 * 1000, // 15 minutes
        extendOnActivity: true,
        maxDuration: 24 * 60 * 60 * 1000, // 24 hours
    },
    audit: {
        enabled: true,
        retentionPeriod: 6 * 365 * 24 * 60 * 60 * 1000, // 6 years (HIPAA requirement)
    },
    tls: {
        minVersion: 'TLSv1.2',
        cipherPreference: 'modern',
    }
};