import employeeService from '@services/employee.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { EResponseCode } from '@shared/enum';
import { createSignInUserToken } from '@shared/helpers';
import AuthService from '@services/auth.service';
import { IRefreshTokenReturn } from '@shared/types';

class AuthController {
  private async generateToken(userid: string): Promise<IRefreshTokenReturn> {
    // set expiring date for refresh token
    const expiredAt = new Date();
    const expiredInTime: number = 60 * 60 * 24 * 7; // 7 = 7days
    expiredAt.setSeconds(expiredAt.getSeconds() + expiredInTime);

    // generate user accessToken and refreshToken
    const token = createSignInUserToken({ id: userid }, true, expiredAt);

    // save refresh token to database
    await AuthService.saveRefreshToken(token.refreshToken!, userid, expiredAt);

    return token;
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await employeeService.getEmployeeBy('email', email);

      return bcrypt
        .compare(user.password, password?.trim())
        .then(async (result: boolean) => {
          if (!result) {
            throw {
              name: 'Invalid Credentials',
              message: 'Invalid email or password',
              code: EResponseCode.FORBIDDEN
            };
          } else {
            const token = await this.generateToken(user.id);
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
          }
        })
        .catch((err) => {
          throw {
            name: 'Invalid Credentials',
            message: err,
            code: EResponseCode.FORBIDDEN
          };
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error?.message });
    }
  }
}

export default new AuthController();
