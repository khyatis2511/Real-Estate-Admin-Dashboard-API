import { Request, Response } from 'express';
import checkRole from '../../middlewares/check-role.middleware';
import { Role } from '@prisma/client';
import analytics from './analytics.service';

const analyticsController = {
  getAnalytics: [
    checkRole([Role.Admin]),
    async (req: Request, res: Response) => {
      analytics.getAnalytics(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  // TODO: Above Metsrics store in database for rcords 
};

export default analyticsController;