import type { Request, Response, NextFunction } from 'express';
import { WellnessService } from '../services/wellness.services'; // Note the .services extension
import { logger } from '../utils/logger';

export class WellnessController {
    private wellnessService: WellnessService;

    constructor() {
        this.wellnessService = new WellnessService();
    }

    getCategories = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.wellnessService.getCategories();
            res.json(categories);
        } catch (error) {
            logger.error('Get categories error:', error);
            next(error);
        }
    };

    getWellnessTools = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { categoryId } = req.query;
            const tools = await this.wellnessService.getWellnessTools(categoryId as string);
            res.json(tools);
        } catch (error) {
            logger.error('Get wellness tools error:', error);
            next(error);
        }
    };

    getResources = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { categoryId, isPremium } = req.query;
            const resources = await this.wellnessService.getResources(
                categoryId as string,
                isPremium === 'true'
            );
            res.json(resources);
        } catch (error) {
            logger.error('Get resources error:', error);
            next(error);
        }
    };

    trackProgress = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const progress = await this.wellnessService.trackProgress({
                user_id: req.user!.userId,
                ...req.body
            });
            res.status(201).json(progress);
        } catch (error) {
            logger.error('Track progress error:', error);
            next(error);
        }
    };

    getUserProgress = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const progress = await this.wellnessService.getUserProgress(req.user!.userId);
            res.json(progress);
        } catch (error) {
            logger.error('Get user progress error:', error);
            next(error);
        }
    };
}