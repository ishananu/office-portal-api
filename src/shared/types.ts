interface IPagination {
  limit: number;
  skip: number;
}

interface ITokenPayload {
  id: string;
  exp: number;
  iat: number;
}

interface IRefreshTokenReturn {
  accessToken: string;
  refreshToken?: string;
}

export { IPagination, ITokenPayload, IRefreshTokenReturn };
