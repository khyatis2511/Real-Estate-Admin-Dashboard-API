import { Request, Response } from 'express';
import checkRole from '../../middlewares/check-role.middleware';
import { Role } from '@prisma/client';
import activity from './activity.service';
import validateSchema from '../../middlewares/validate-schema.middleware';
import { activitySchema } from './schema/activity.schema';


const activityController = {
  getActivityLogsByUserId: [
    checkRole([Role.Admin]),
    async (req: Request, res: Response) => {
      activity.getActivityLogsByUserId(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  getActivityLogs: [
    checkRole([Role.Admin]),
    (req: Request, res: Response) => {
      activity.getActivityLogs(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  createActivityLog: [
    checkRole([Role.User, Role.Admin]),
    validateSchema(activitySchema),
    async (req: Request, res: Response) => {
      activity.createActivityLog(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
};

export default activityController;