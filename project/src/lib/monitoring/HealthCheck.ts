import { Redis } from 'ioredis';
import { Pool } from 'pg';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  checks: {
    database: boolean;
    cache: boolean;
    api: boolean;
  };
  timestamp: Date;
}

export class HealthCheck {
  private db: Pool;
  private redis: Redis;

  constructor() {
    this.db = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432')
    });

    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });
  }

  async checkHealth(): Promise<HealthStatus> {
    const dbHealthy = await this.checkDatabase();
    const cacheHealthy = await this.checkCache();
    const apiHealthy = await this.checkExternalAPIs();

    return {
      status: dbHealthy && cacheHealthy && apiHealthy ? 'healthy' : 'unhealthy',
      checks: {
        database: dbHealthy,
        cache: cacheHealthy,
        api: apiHealthy
      },
      timestamp: new Date()
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      const client = await this.db.connect();
      await client.query('SELECT 1');
      client.release();
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  private async checkCache(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch (error) {
      console.error('Cache health check failed:', error);
      return false;
    }
  }

  private async checkExternalAPIs(): Promise<boolean> {
    try {
      // Add checks for critical external APIs
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
}