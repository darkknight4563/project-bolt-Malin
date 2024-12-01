import { pool } from '../config/database';
import { NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export class UserService {
  public async getUserById(userId: string) {
    try {
      const result = await pool.query(
        `SELECT id, email, first_name, last_name, date_of_birth, role
         FROM users WHERE id = $1`,
        [userId]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError('User not found');
      }

      return result.rows[0];
    } catch (error) {
      logger.error('Get user error:', error);
      throw error;
    }
  }

  public async updateUser(userId: string, userData: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE users
         SET first_name = COALESCE($1, first_name),
             last_name = COALESCE($2, last_name),
             date_of_birth = COALESCE($3, date_of_birth),
             updated_at = NOW()
         WHERE id = $4
         RETURNING id, email, first_name, last_name, date_of_birth, role`,
        [userData.firstName, userData.lastName, userData.dateOfBirth, userId]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError('User not found');
      }

      return result.rows[0];
    } catch (error) {
      logger.error('Update user error:', error);
      throw error;
    }
  }

  public async getUserPreferences(userId: string) {
    try {
      const result = await pool.query(
        'SELECT preferences FROM user_preferences WHERE user_id = $1',
        [userId]
      );

      return result.rows[0]?.preferences || {};
    } catch (error) {
      logger.error('Get preferences error:', error);
      throw error;
    }
  }

  public async updateUserPreferences(userId: string, preferences: object) {
    try {
      const result = await pool.query(
        `INSERT INTO user_preferences (user_id, preferences)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE
         SET preferences = $2
         RETURNING preferences`,
        [userId, preferences]
      );

      return result.rows[0].preferences;
    } catch (error) {
      logger.error('Update preferences error:', error);
      throw error;
    }
  }
}