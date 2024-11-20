import { EResponseCode } from '../common/enums';
import { Request, Response } from 'express';
import { sequelize } from '../../config/database';
import { Transaction } from 'sequelize';

// handle every db call by try/catch
const asyncMiddleware = function (handler) {
  return async (req: Request, res: Response, next) => {
    let transaction: Transaction | null = null;
    console.log('********** ROUTE NAME: ', req.baseUrl + req.url);

    if (req.method === 'POST' || req.method === 'PUT') {
      transaction = await sequelize.transaction();
    }

    // const { detect } = require('detect-browser');
    // const browser = detect();

    // // handle the case where we don't detect the browser
    // if (browser) {
    //   console.log('--------------------------------');
    //   console.log('browser.name, ', browser.name);
    //   console.log('browser.version, ', browser.version);
    //   console.log('browser.os ', browser.os);
    //   console.log('--------------------------------');
    // }

    try {
      const results = await handler(req, res, transaction);
      if (!results) {
        if (transaction) {
          transaction?.commit();
        }
        next(
          res.send({
            success: false,
            message: 'Data not found'
          })
        );
      } else {
        if (transaction) {
          transaction?.commit();
        }
        next(
          res.send({
            success: true,
            data: results
          })
        );
      }
    } catch (err) {
      // TODO: check the error and adjust error code with response,
      // user doesn't need to know the exact reson of error
      // pass error number
      if (transaction) {
        transaction.rollback();
      }
      console.log('err ', err);

      // TODO : need to create morgan logs here
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
