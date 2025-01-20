import { Request, Response } from 'express';
import validateSchema from '../../middlewares/validate-schema.middleware';
import checkRole from '../../middlewares/check-role.middleware';
import { Role } from '@prisma/client';
import user from './user.service';
import { updateStatusSchema } from './schema/update-status.schema';


const userController = {
  getUsers: [
    checkRole([Role.Admin]),
    async (req: Request, res: Response) => {
      user.getUsers(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  updateUserStatus: [
    checkRole([Role.Admin]),
    validateSchema(updateStatusSchema),
    async (req: Request, res: Response) => {
      user.updateUserStatus(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  getUserCounts: [
    checkRole([Role.Admin]),
    async (req: Request, res: Response) => {
      user.getUserCounts(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ]
  // TODO : write api logic for update status of admins who can update only super admin
};

export default userController;