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

interface IPaginativeQuery<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export { IPagination, ITokenPayload, IRefreshTokenReturn, IPaginativeQuery };
