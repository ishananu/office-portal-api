import Product, { IProduct } from 'src/models/Product';

class ProductService {
  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(data);
    return await product.save();
  }

  async getProduct(): Promise<IProduct[]> {
    return await Product.find();
  }
}

export default new ProductService();
