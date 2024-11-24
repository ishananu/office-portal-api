import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';
import { EResponseCode } from '@shared/enum';
import { ITokenPayload } from '@shared/types';
import config from '@config/config';

function getUser(req: Request): ITokenPayload {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[1];

  if (!token) {
    throw {
      success: false,
      message: 'Invalid token'
    };
  }

  try {
    const user = jwt.verify(
      token,
      config.secretToken as jwt.Secret
    ) as ITokenPayload;
    return user;
  } catch (err) {
    throw {
      success: false,
      message: 'Invalid token'
    };
  }
}

export async function userRequired(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await getUser(req);
    if (!user) {
      throw {
        success: false,
        message: 'Action not authorized'
      };
    }

    req.body = Array.isArray(req.body)
      ? { data: req.body, token: user }
      : { ...req.body, token: user };

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(EResponseCode.UNAUTHORIZED).send({
        success: false,
        message: 'Invalid token'
      });
    }

    res.status(EResponseCode.FORBIDDEN).send({
      success: false,
      message: 'Action not authorized'
    });
  }
}

// export function userNotRequired(req: Request, _res, next) {
//   getUser(req, (_err, user: ITokenPayload) => {
//     console.log('user ', user);

//     if (user) {
//       req.body = { ...req.body, token: user };
//     }
//     next();
//   });
// }

export function decodeRefreshToken(token: string) {
  return jwt.decode(token);
}
