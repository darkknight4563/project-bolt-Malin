import { Redis } from 'ioredis';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export class RateLimiter {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });
  }

  async isRateLimited(
    key: string,
    config: RateLimitConfig
  ): Promise<{ limited: boolean; remaining: number }> {
    const now = Date.now();
    const windowKey = `ratelimit:${key}:${Math.floor(now / config.windowMs)}`;

    const multi = this.redis.multi();
    multi.incr(windowKey);
    multi.pexpire(windowKey, config.windowMs);

    const [count] = await multi.exec();
    const requestCount = count?.[1] as number;

    return {
      limited: requestCount > config.maxRequests,
      remaining: Math.max(0, config.maxRequests - requestCount)
    };
  }

  async clearRateLimit(key: string): Promise<void> {
    const pattern = `ratelimit:${key}:*`;
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}