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

  async updateProduct(
    id: string,
    updates: Partial<IProduct>
  ): Promise<IProduct | null> {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  }
}

export default new ProductService();
