import rateLimit from 'express-rate-limit';
import { redisClient } from '../utils/redis';
import { logger } from '../utils/logger';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded:', {
      ip: req.ip,
      path: req.path
    });
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  },
  store: {
    incr: async (key: string) => {
      try {
        const count = await redisClient.incr(key);
        await redisClient.expire(key, 15 * 60);
        return count;
      } catch (error) {
        logger.error('Rate limiter Redis error:', error);
        return 0;
      }
    },
    decrement: async (key: string) => {
      try {
        await redisClient.decr(key);
      } catch (error) {
        logger.error('Rate limiter Redis error:', error);
      }
    },
    resetKey: async (key: string) => {
      try {
        await redisClient.del(key);
      } catch (error) {
        logger.error('Rate limiter Redis error:', error);
      }
    }
  }
});