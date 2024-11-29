import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { AuthError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';

export class AuthService {
  private async generateTokens(userId: string, role: string) {
    const accessToken = jwt.sign(
      { userId, role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    const refreshToken = jwt.sign(
      { userId, role },
      process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    );

    return { accessToken, refreshToken };
  }

  public async login(email: string, password: string) {
    try {
      const result = await pool.query(
        'SELECT id, password_hash, role FROM users WHERE email = $1',
        [email]
      );

      const user = result.rows[0];
      if (!user) {
        throw new AuthError('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new AuthError('Invalid credentials');
      }

      const tokens = await this.generateTokens(user.id, user.role);
      return { ...tokens, userId: user.id };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  public async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    role: string;
  }) {
    try {
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [userData.email]
      );

      if (existingUser.rows.length > 0) {
        throw new ValidationError('Email already registered');
      }

      const passwordHash = await bcrypt.hash(userData.password, 10);
      const result = await pool.query(
        `INSERT INTO users (
          email, password_hash, first_name, last_name,
          date_of_birth, role, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id, role`,
        [
          userData.email,
          passwordHash,
          userData.firstName,
          userData.lastName,
          userData.dateOfBirth,
          userData.role
        ]
      );

      const newUser = result.rows[0];
      const tokens = await this.generateTokens(newUser.id, newUser.role);
      return { ...tokens, userId: newUser.id };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  public async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret'
      ) as { userId: string; role: string };

      const tokens = await this.generateTokens(decoded.userId, decoded.role);
      return tokens;
    } catch (error) {
      logger.error('Token refresh error:', error);
      throw new AuthError('Invalid refresh token');
    }
  }
}