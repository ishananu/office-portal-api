import { Request } from 'express';
import { IPagination, IRefreshTokenReturn } from './types';
import jwt from 'jsonwebtoken';
import config from '@config/config';

function handlePagination(req: Request): IPagination {
  const maxNumberOfResults: number = 20;
  let page: number = parseInt(req.query.p as string);
  let size: number = parseInt(req.query.s as string);

  if (!page) {
    page = 1;
  }
  if (!size || size > maxNumberOfResults) {
    size = 10;
  }
  return {
    limit: size,
    skip: (page - 1) * size
  };
}

async function paginateQuery<T>(
  model: any,
  query: Record<string, any> = {},
  pagination: IPagination = { skip: 0, limit: 10 },
  projection: Record<string, 1 | 0> = {},
  options: Record<string, any> = {}
): Promise<T[]> {
  const { skip = 0, limit = 10 } = pagination;
  return await model
    .find(query, projection, options)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
}

function generateAccessToken(user): string {
  return config?.secretToken
    ? jwt.sign(user, config?.secretToken, { expiresIn: '30m' })
    : ''; // 15 min should be
}

function createSignInUserToken(
  userData: { id: string },
  initialCreation: boolean = false,
  expiredAt?: Date
): IRefreshTokenReturn {
  const accessToken = generateAccessToken(userData);
  if (initialCreation && config.refreshToken) {
    const refreshToken = jwt.sign(
      { data: userData, exp: expiredAt?.getTime(), iat: new Date().getTime() },
      config.refreshToken
    );
    return { accessToken, refreshToken };
  } else {
    return {
      accessToken
    };
  }
}

export { handlePagination, paginateQuery, createSignInUserToken };
