import Product, { IProduct } from '@models/Product';
import { paginateQuery } from '@shared/helpers';
import { IPagination } from '@shared/types';

class ProductService {
  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(data);
    return await product.save();
  }

  async getProduct(pagination: IPagination): Promise<IProduct[]> {
    return paginateQuery<IProduct>(Product, {}, pagination);
  }
}

export default new ProductService();
