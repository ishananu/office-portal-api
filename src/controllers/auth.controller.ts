import employeeService from '@services/employee.service';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { EResponseCode } from '@shared/enum';
import { createSignInUserToken } from '@shared/helpers';
import AuthService from '@services/auth.service';
import { IRefreshTokenReturn } from '@shared/types';
import config from '@config/config';
import { TokenExpiredError, verify } from 'jsonwebtoken';

class AuthController {
  generateToken = async (userid: string): Promise<IRefreshTokenReturn> => {
    // set expiring date for refresh token
    const expiredAt = new Date();
    const expiredInTime: number = 60 * 60 * 24 * 7; // 7 = 7days
    expiredAt.setSeconds(expiredAt.getSeconds() + expiredInTime);
    // generate user accessToken and refreshToken
    const token = await createSignInUserToken({ id: userid }, true, expiredAt);
    // save refresh token to database
    await AuthService.saveRefreshToken(token.refreshToken!, userid, expiredAt);
    return token;
  };

  refreshToken = async (req: Request) => {
    const jidToken = req.body?.token;

    if (!jidToken) {
      throw {
        name: 'Not authorized',
        message: 'Not authorized',
        code: EResponseCode.FORBIDDEN
      };
    }

    return verify(jidToken, config.refreshToken!, async (err, tokenPayload) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          console.log('TokenExpiredError ', err);
          await AuthService.destroyRefreshToken(jidToken);
        }

        throw {
          name: 'Not authorized',
          message: 'Refresh token expired or invalid, please signin again',
          code: EResponseCode.FORBIDDEN
        };
      }

      const userId: string = tokenPayload.data.id;

      const dbTokenCount = await AuthService.getRereshTokenCount(
        userId,
        jidToken
      );

      if (dbTokenCount > 0) {
        const newToken = await createSignInUserToken({
          id: userId
        });

        return {
          token: newToken.accessToken
        };
      } else {
        throw {
          name: 'Not authorized',
          message: 'Refresh token not found in database',
          code: EResponseCode.FORBIDDEN
        };
      }
    });
  };

  loginUser = async (
    req: Request,
    _res: Response
  ): Promise<
    | {
        token: string;
        name: string;
        id: string;
        refreshToken: string;
        email: string;
      }
    | undefined
  > => {
    const { email, pass } = req.body;
    console.log('req.body ', req.body);

    const user = await employeeService.getEmployeeBy('email', email);
    if (!user) {
      throw {
        code: EResponseCode.ERROR,
        message: 'Cannot find relevant records'
      };
    }
    const result = await bcrypt.compare(pass?.trim(), user?.password);

    if (!result) {
      throw {
        code: EResponseCode.FORBIDDEN,
        message: 'Invalid email or password'
      };
      return;
    }

    const token = await this.generateToken(user.id.toString());

    return {
      token: token.accessToken,
      name: user.name,
      id: user.id,
      email,
      refreshToken: token.refreshToken!
    };
  };

  logOutUser = async (req: Request, res: Response): Promise<boolean> => {
    console.log('REQ ', JSON.stringify(req.body));
    await AuthService.destroyRefreshToken(req?.body?.token?.id);
    res.cookie('jid', '');
    return true;
  };
}

export default new AuthController();
