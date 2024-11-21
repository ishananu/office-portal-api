import { Router } from 'express';
import ProductController from 'src/controllers/product.controller';

const productRouter = Router();

productRouter.post('/', ProductController.createProduct);
productRouter.get('/', ProductController.getProduct);

export default productRouter;
