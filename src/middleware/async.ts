import { EResponseCode } from '@shared/enum';
import { Request, Response } from 'express';

// handle every db call by try/catch
const asyncMiddleware = function (handler) {
  return async (req: Request, res: Response, next) => {
    console.log('********** ROUTE NAME: ', req.baseUrl + req.url);
    try {
      const results = await handler(req, res);
      if (!results) {
        next(
          res.status(EResponseCode.FORBIDDEN).send({
            success: false,
            message: 'Data not found'
          })
        );
      } else {
        next(
          res.send({
            success: true,
            data: results
          })
        );
      }
    } catch (err) {
      console.log('err ', err);
      next(
        res.status(err?.code || EResponseCode.ERROR).send({
          success: false,
          message:
            err.message ||
            'Something went wrong, please try again after few momemnt.',
          details: err.name
        })
      );
    }
  };
};

export default asyncMiddleware;
