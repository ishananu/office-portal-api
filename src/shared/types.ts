interface IPagination {
  limit: number;
  skip: number;
}

interface ITokenPayload {
  id: string;
  exp: number;
  iat: number;
}

export { IPagination, ITokenPayload };
