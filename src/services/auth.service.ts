import RefreshToken, { IRefreshToken } from '@models/RefreshToken';

class AuthService {
  async saveRefreshToken(
    token: string,
    usersId: string,
    expiredAt: Date
  ): Promise<IRefreshToken> {
    return await RefreshToken.findOneAndUpdate(
      { usersId },
      { token, expiredAt },
      { upsert: true, new: true }
    );
  }
}

export default new AuthService();
