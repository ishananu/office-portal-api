import { handlePagination } from '@shared/helpers';
import { Request, Response } from 'express';
import ProductService from '@services/product.service';

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const user = await ProductService.createProduct(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const users = await ProductService.getProduct(handlePagination(req));
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const users = await ProductService.updateProduct(id, req.body);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const users = await ProductService.deleteProduct(id);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ProductController();
