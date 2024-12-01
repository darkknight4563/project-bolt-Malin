import { pool } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';

export class AppointmentService {
  public async createAppointment(appointmentData: {
    patientId: string;
    therapistId: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) {
    try {
      // Validate therapist availability
      const isAvailable = await this.checkTherapistAvailability(
        appointmentData.therapistId,
        appointmentData.startTime,
        appointmentData.endTime
      );

      if (!isAvailable) {
        throw new ValidationError('Therapist is not available at this time');
      }

      const result = await pool.query(
        `INSERT INTO appointments (
          patient_id, therapist_id, start_time, end_time, notes, status
        ) VALUES ($1, $2, $3, $4, $5, 'scheduled')
        RETURNING *`,
        [
          appointmentData.patientId,
          appointmentData.therapistId,
          appointmentData.startTime,
          appointmentData.endTime,
          appointmentData.notes
        ]
      );

      return result.rows[0];
    } catch (error) {
      logger.error('Create appointment error:', error);
      throw error;
    }
  }

  public async getUpcomingAppointments(userId: string) {
    try {
      const result = await pool.query(
        `SELECT a.*, t.name as therapist_name, t.title as therapist_title
         FROM appointments a
         JOIN therapists t ON a.therapist_id = t.id
         WHERE (a.patient_id = $1 OR t.user_id = $1)
         AND a.start_time > NOW()
         AND a.status = 'scheduled'
         ORDER BY a.start_time ASC`,
        [userId]
      );

      return result.rows;
    } catch (error) {
      logger.error('Get upcoming appointments error:', error);
      throw error;
    }
  }

  public async getAppointmentById(appointmentId: string, userId: string) {
    try {
      const result = await pool.query(
        `SELECT a.*, t.name as therapist_name, t.title as therapist_title
         FROM appointments a
         JOIN therapists t ON a.therapist_id = t.id
         WHERE a.id = $1 AND (a.patient_id = $2 OR t.user_id = $2)`,
        [appointmentId, userId]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError('Appointment not found');
      }

      return result.rows[0];
    } catch (error) {
      logger.error('Get appointment error:', error);
      throw error;
    }
  }

  public async cancelAppointment(appointmentId: string, userId: string) {
    try {
      const result = await pool.query(
        `UPDATE appointments
         SET status = 'cancelled', updated_at = NOW()
         WHERE id = $1 AND (patient_id = $2 OR therapist_id IN (
           SELECT id FROM therapists WHERE user_id = $2
         ))
         RETURNING *`,
        [appointmentId, userId]
      );

      if (result.rows.length === 0) {
        throw new NotFoundError('Appointment not found');
      }

      return result.rows[0];
    } catch (error) {
      logger.error('Cancel appointment error:', error);
      throw error;
    }
  }

  public async rescheduleAppointment(
    appointmentId: string,
    userId: string,
    newTime: { startTime: string; endTime: string }
  ) {
    try {
      const appointment = await this.getAppointmentById(appointmentId, userId);

      const isAvailable = await this.checkTherapistAvailability(
        appointment.therapist_id,
        newTime.startTime,
        newTime.endTime
      );

      if (!isAvailable) {
        throw new ValidationError('Therapist is not available at this time');
      }

      const result = await pool.query(
        `UPDATE appointments
         SET start_time = $1, end_time = $2, updated_at = NOW()
         WHERE id = $3 AND (patient_id = $4 OR therapist_id IN (
           SELECT id FROM therapists WHERE user_id = $4
         ))
         RETURNING *`,
        [newTime.startTime, newTime.endTime, appointmentId, userId]
      );

      return result.rows[0];
    } catch (error) {
      logger.error('Reschedule appointment error:', error);
      throw error;
    }
  }

  private async checkTherapistAvailability(
    therapistId: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    try {
      const result = await pool.query(
        `SELECT COUNT(*) FROM appointments
         WHERE therapist_id = $1
         AND status = 'scheduled'
         AND (
           (start_time <= $2 AND end_time > $2)
           OR (start_time < $3 AND end_time >= $3)
           OR (start_time >= $2 AND end_time <= $3)
         )`,
        [therapistId, startTime, endTime]
      );

      return parseInt(result.rows[0].count) === 0;
    } catch (error) {
      logger.error('Check availability error:', error);
      throw error;
    }
  }
}