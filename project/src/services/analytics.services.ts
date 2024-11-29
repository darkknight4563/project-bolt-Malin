import { pool } from '../config/database';
import { UserEngagement, WellnessMetrics } from '../types/analytics';
import { logger } from '../utils/logger';

export class AnalyticsService {

    async trackEngagement(engagement: UserEngagement): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO user_engagement 
                (user_id, feature, duration, start_time, end_time, completion_status)
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    engagement.userId,
                    engagement.feature,
                    engagement.duration,
                    engagement.startTime,
                    engagement.endTime,
                    engagement.completionStatus
                ]
            );

            // Update feature usage statistics
            await this.updateFeatureUsage(engagement);
        } catch (error) {
            logger.error('Engagement tracking error:', error);
            throw error;
        }
    }

    async trackWellnessMetrics(metrics: WellnessMetrics): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO wellness_metrics 
                (user_id, metric_type, value, timestamp, notes)
                VALUES ($1, $2, $3, $4, $5)`,
                [
                    metrics.userId,
                    metrics.metricType,
                    metrics.value,
                    metrics.timestamp,
                    metrics.notes
                ]
            );
        } catch (error) {
            logger.error('Wellness metrics tracking error:', error);
            throw error;
        }
    }

    private async updateFeatureUsage(engagement: UserEngagement): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO feature_usage 
                (feature_id, user_id, usage_count, last_used, total_duration)
                VALUES ($1, $2, 1, $3, $4)
                ON CONFLICT (feature_id, user_id)
                DO UPDATE SET 
                    usage_count = feature_usage.usage_count + 1,
                    last_used = EXCLUDED.last_used,
                    total_duration = feature_usage.total_duration + EXCLUDED.total_duration`,
                [
                    engagement.feature,
                    engagement.userId,
                    engagement.endTime,
                    engagement.duration
                ]
            );
        } catch (error) {
            logger.error('Feature usage update error:', error);
            throw error;
        }
    }

    async getWellnessInsights(userId: string): Promise<any> {
        try {
            const result = await pool.query(
                `SELECT 
                    metric_type,
                    AVG(value) as average_value,
                    MIN(value) as min_value,
                    MAX(value) as max_value,
                    COUNT(*) as total_entries
                FROM wellness_metrics
                WHERE user_id = $1
                AND timestamp >= NOW() - INTERVAL '30 days'
                GROUP BY metric_type`,
                [userId]
            );
            return result.rows;
        } catch (error) {
            logger.error('Wellness insights error:', error);
            throw error;
        }
    }
}