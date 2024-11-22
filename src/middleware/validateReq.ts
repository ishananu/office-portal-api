import Joi from 'joi';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { EResponseCode } from '@shared/enum';

const validateReq = (schema: Joi.ObjectSchema): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        res.status(EResponseCode.BAD_REQUEST).json({
          errors: error.details.map((e) => e.message)
        });
        return;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default validateReq;
