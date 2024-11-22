import { Request } from 'express';
import { IPagination } from './types';

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

export { handlePagination, paginateQuery };
