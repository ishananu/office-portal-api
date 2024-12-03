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
    const jidToken = req.cookies?.jid;
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
        return { token: newToken.accessToken };
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
    res: Response
  ): Promise<{ token: string; name: string; id: string } | undefined> => {
    const { email, pass } = req.body;
    const user = await employeeService.getEmployeeBy('email', email);
    const result = await bcrypt.compare(pass?.trim(), user?.password);

    if (!result) {
      throw new Error('Invalid email or password');
      return;
    }

    const token = await this.generateToken(user.id.toString());

    res.cookie('jid', token.refreshToken, {
      httpOnly: false,
      sameSite: 'none',
      secure: true
    });

    return {
      token: token.accessToken,
      name: user.name,
      id: user.id
    };
  };
}

export default new AuthController();
