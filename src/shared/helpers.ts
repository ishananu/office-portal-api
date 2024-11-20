import { Request } from 'express';
import { IPagination } from './types';

export function handlePagination(req: Request): IPagination {
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
