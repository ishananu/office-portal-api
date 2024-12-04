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
  async destroyRefreshToken(token: string): Promise<boolean | null> {
    return await RefreshToken.findOneAndDelete({ token });
  }

  async getRereshTokenCount(usersId: string, token: string): Promise<number> {
    const logAll = await RefreshToken.find({ usersId, token });
    return await RefreshToken.countDocuments({ usersId, token });
  }
}

export default new AuthService();
