import { pool } from '../config/database';
import { WellnessTool, Resource, ResourceCategory, UserProgress } from '../types/wellness';

export class WellnessService {
    async getCategories(): Promise<ResourceCategory[]> {
        const result = await pool.query('SELECT * FROM resource_categories ORDER BY name');
        return result.rows;
    }

    async getWellnessTools(categoryId?: string): Promise<WellnessTool[]> {
        const query = categoryId
            ? 'SELECT * FROM wellness_tools WHERE category_id = $1 AND is_active = true'
            : 'SELECT * FROM wellness_tools WHERE is_active = true';
        const values = categoryId ? [categoryId] : [];
        const result = await pool.query(query, values);
        return result.rows;
    }

    async getResources(categoryId?: string, isPremium?: boolean): Promise<Resource[]> {
        let query = 'SELECT * FROM resources WHERE is_active = true';
        const values: any[] = [];
        
        if (categoryId) {
            values.push(categoryId);
            query += ` AND category_id = $${values.length}`;
        }
        
        if (isPremium !== undefined) {
            values.push(isPremium);
            query += ` AND is_premium = $${values.length}`;
        }
        
        const result = await pool.query(query, values);
        return result.rows;
    }

    async trackProgress(progress: Omit<UserProgress, 'id'>): Promise<UserProgress> {
        const result = await pool.query(
            `INSERT INTO user_progress 
            (user_id, tool_id, duration_minutes, notes, mood_rating, effectiveness_rating)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                progress.user_id,
                progress.tool_id,
                progress.duration_minutes,
                progress.notes,
                progress.mood_rating,
                progress.effectiveness_rating
            ]
        );
        return result.rows[0];
    }

    async getUserProgress(userId: string): Promise<UserProgress[]> {
        const result = await pool.query(
            `SELECT up.*, wt.title as tool_title
             FROM user_progress up
             JOIN wellness_tools wt ON up.tool_id = wt.id
             WHERE up.user_id = $1
             ORDER BY up.completed_at DESC`,
            [userId]
        );
        return result.rows;
    }
}