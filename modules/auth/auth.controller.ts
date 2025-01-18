import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import auth from './auth.service';
import { registerSchema } from './schema/register.schema';

const authController = {
  register: async (req: Request, res: Response) => {
    await checkSchema(registerSchema).run(req);
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(400).send({
        success: false,
        errors: errors.array(),
      }).end();
    }
      
    auth.register(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  login: (req: Request, res: Response) => {
    auth.login(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
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