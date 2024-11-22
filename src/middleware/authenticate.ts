import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { EResponseCode } from '@shared/enum';
import { ITokenPayload } from '@shared/types';
import config from '@config/config';

function getUser(req: Request, callBack) {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[1];

  if (!!!token) {
    return callBack(null, null);
  }
  jwt.verify(token, config.secretToken, (err, user) => {
    if (err) {
      return callBack(err);
    }
    return callBack(err, user);
  });
}

const parseIp = (req) => {
  req.headers['x-forwarded-for']?.split(',').shift() ||
    req.socket?.remoteAddress;
};

export function userRequired(req: Request, res: Response, next: NextFunction) {
  getUser(req, (err, user) => {
    if (err || user === null) {
      if (err instanceof TokenExpiredError) {
        return res.status(EResponseCode.UNAUTHORIZED).send({
          success: false,
          message: 'Invalid token'
        });
      } else {
        return res.status(EResponseCode.FORBIDDEN).send({
          success: false,
          message: 'Action not authorized'
        });
      }
    }

    req.body = Array.isArray(req.body)
      ? { data: req.body, token: user }
      : { ...req.body, token: user };
    next();
  });
}

export function userNotRequired(req: Request, _res, next) {
  getUser(req, (_err, user: ITokenPayload) => {
    console.log('user ', user);

    if (user) {
      req.body = { ...req.body, token: user };
    }
    next();
  });
}

export function decodeRefreshToken(token: string) {
  return jwt.decode(token, config.refreshToken);
}
