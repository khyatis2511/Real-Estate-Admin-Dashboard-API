import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult, Schema } from 'express-validator';
import { msgs, returnRes } from '../utils/messages';

const validateSchema = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send(returnRes(400, msgs.validationError, errors.array())).end();
      return;
    }
    next();
  };
};

export default validateSchema;
