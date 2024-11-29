import { Request, Response, NextFunction } from 'express';
import { BaseError, AuthError } from '../utils/errors';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code
    });
    return;
  }

  if (err instanceof AuthError) {
    res.status(401).json({
      status: 'error',
      message: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
};