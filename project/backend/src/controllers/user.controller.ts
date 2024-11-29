import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { logger } from '../utils/logger';

export class UserController {
  private userService = new UserService();

  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      logger.error('Get profile error:', error);
      next(error);
    }
  };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const updatedUser = await this.userService.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      logger.error('Update profile error:', error);
      next(error);
    }
  };

  public getPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const preferences = await this.userService.getUserPreferences(userId);
      res.json(preferences);
    } catch (error) {
      logger.error('Get preferences error:', error);
      next(error);
    }
  };

  public updatePreferences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const preferences = await this.userService.updateUserPreferences(userId, req.body);
      res.json(preferences);
    } catch (error) {
      logger.error('Update preferences error:', error);
      next(error);
    }
  };

  public getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await pool.query(
        'SELECT id, email, first_name, last_name, role FROM users'
      );
      res.json(result.rows);
    } catch (error) {
      logger.error('Get all users error:', error);
      next(error);
    }
  };
}