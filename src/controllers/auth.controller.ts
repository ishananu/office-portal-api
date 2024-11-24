import employeeService from '@services/employee.service';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { EResponseCode } from '@shared/enum';
import { createSignInUserToken } from '@shared/helpers';
import AuthService from '@services/auth.service';
import { IRefreshTokenReturn } from '@shared/types';
import config from '@config/config';

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

  loginUser = async (
    req: Request,
    res: Response
  ): Promise<{ token: string; name: string; id: string } | undefined> => {
    try {
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
    } catch (err) {
      throw {
        name: 'Invalid Credentials',
        message: err,
        code: EResponseCode.FORBIDDEN
      };
    }
  };
}

export default new AuthController();
