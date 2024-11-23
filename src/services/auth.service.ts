import RefreshToken, { IRefreshToken } from '@models/RefreshToken';

class AuthService {
  async saveRefreshToken(
    token: string,
    usersId: string,
    expiredAt: Date
  ): Promise<IRefreshToken> {
    const refreshToken = new RefreshToken({ token, usersId, expiredAt });
    return await refreshToken.save();
  }
}

export default new AuthService();
