import { handlePagination } from '@shared/helpers';
import { Request, Response } from 'express';
import productService from 'src/services/product.service';

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const user = await productService.createProduct(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const users = await productService.getProduct(handlePagination(req));
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ProductController();
