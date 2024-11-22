import ProductController from '../../src/controllers//product.controller';
import ProductService from '../../src/services/product.service';
import { Request, Response } from 'express';

jest.mock('@services/product.service'); // Mock the ProductService

describe('ProductController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = { body: {}, params: {}, query: {} };
    res = { status: statusMock, json: jsonMock };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should return 201 with the created product', async () => {
      const mockProduct = { id: '123', name: 'Sample Product' };
      (ProductService.createProduct as jest.Mock).mockResolvedValue(
        mockProduct
      );

      req.body = { name: 'Sample Product', price: 100 };
      await ProductController.createProduct(req as Request, res as Response);

      expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockProduct
      });
    });

    it('should return 500 on error', async () => {
      const mockError = new Error('Database error');
      (ProductService.createProduct as jest.Mock).mockRejectedValue(mockError);

      req.body = { name: 'Sample Product', price: 100 };
      await ProductController.createProduct(req as Request, res as Response);

      expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockError.message
      });
    });
  });

  describe('getProduct', () => {
    it('should return 200 with the list of products', async () => {
      const mockProducts = [{ id: '123', name: 'Sample Product' }];
      (ProductService.getProduct as jest.Mock).mockResolvedValue(mockProducts);

      await ProductController.getProduct(req as Request, res as Response);

      expect(ProductService.getProduct).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockProducts
      });
    });

    it('should return 500 on error', async () => {
      const mockError = new Error('Database error');
      (ProductService.getProduct as jest.Mock).mockRejectedValue(mockError);

      await ProductController.getProduct(req as Request, res as Response);

      expect(ProductService.getProduct).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockError.message
      });
    });
  });

  describe('updateProduct', () => {
    it('should return 200 with the updated product', async () => {
      const mockUpdatedProduct = { id: '123', name: 'Updated Product' };
      (ProductService.updateProduct as jest.Mock).mockResolvedValue(
        mockUpdatedProduct
      );

      req.params = { id: '123' };
      req.body = { name: 'Updated Product' };
      await ProductController.updateProduct(req as Request, res as Response);

      expect(ProductService.updateProduct).toHaveBeenCalledWith(
        '123',
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockUpdatedProduct
      });
    });

    it('should return 500 on error', async () => {
      const mockError = new Error('Database error');
      (ProductService.updateProduct as jest.Mock).mockRejectedValue(mockError);

      req.params = { id: '123' };
      req.body = { name: 'Updated Product' };
      await ProductController.updateProduct(req as Request, res as Response);

      expect(ProductService.updateProduct).toHaveBeenCalledWith(
        '123',
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockError.message
      });
    });
  });

  describe('deleteProduct', () => {
    it('should return 200 with the deleted product', async () => {
      const mockDeletedProduct = { id: '123', name: 'Deleted Product' };
      (ProductService.deleteProduct as jest.Mock).mockResolvedValue(
        mockDeletedProduct
      );

      req.params = { id: '123' };
      await ProductController.deleteProduct(req as Request, res as Response);

      expect(ProductService.deleteProduct).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockDeletedProduct
      });
    });

    it('should return 500 on error', async () => {
      const mockError = new Error('Database error');
      (ProductService.deleteProduct as jest.Mock).mockRejectedValue(mockError);

      req.params = { id: '123' };
      await ProductController.deleteProduct(req as Request, res as Response);

      expect(ProductService.deleteProduct).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockError.message
      });
    });
  });
});
