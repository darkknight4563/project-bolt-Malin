import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { logger } from '../utils/logger';

export class AppointmentController {
  private appointmentService = new AppointmentService();

  public createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const appointment = await this.appointmentService.createAppointment({
        ...req.body,
        patientId: userId
      });
      res.status(201).json(appointment);
    } catch (error) {
      logger.error('Create appointment error:', error);
      next(error);
    }
  };

  public getUpcomingAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const appointments = await this.appointmentService.getUpcomingAppointments(userId);
      res.json(appointments);
    } catch (error) {
      logger.error('Get upcoming appointments error:', error);
      next(error);
    }
  };

  public getAppointmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const appointment = await this.appointmentService.getAppointmentById(id, userId);
      res.json(appointment);
    } catch (error) {
      logger.error('Get appointment error:', error);
      next(error);
    }
  };

  public cancelAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const appointment = await this.appointmentService.cancelAppointment(id, userId);
      res.json(appointment);
    } catch (error) {
      logger.error('Cancel appointment error:', error);
      next(error);
    }
  };

  public rescheduleAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const appointment = await this.appointmentService.rescheduleAppointment(
        id,
        userId,
        req.body
      );
      res.json(appointment);
    } catch (error) {
      logger.error('Reschedule appointment error:', error);
      next(error);
    }
  };
}