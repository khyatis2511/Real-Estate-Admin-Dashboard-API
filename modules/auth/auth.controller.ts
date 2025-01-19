import { Request, Response } from 'express';
import auth from './auth.service';
import { registerSchema } from './schema/register.schema';
import { loginSchema } from './schema/login.schema';
import validateSchema from '../../middlewares/validateSchema.middleware';

const authController = {
  register: [
    validateSchema(registerSchema),
    (req: Request, res: Response) => {
      auth.register(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  login: [
    validateSchema(loginSchema),
    async (req: Request, res: Response) => {
      auth.login(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  whoAmI: (req: Request, res: Response) => {
    auth.whoAmI(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  logout: (req: Request, res: Response) => {
    auth.logout(req).then((result) => {
      res.status(200).send(result).end();
    });
  },
};

export default authController;