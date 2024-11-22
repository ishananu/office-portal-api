import { Router } from 'express';
import ProductController from '@controllers/product.controller';

const productRouter = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product.
 *     description: Create a new product by providing product details.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Product A"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 25.99
 *               description:
 *                 type: string
 *                 description: A brief description of the product.
 *                 example: "A high-quality product."
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *                 example: "Electronics"
 *               stock:
 *                 type: number
 *                 description: The available stock of the product.
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Invalid input or missing fields.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Retrieve a list of products with pagination.
 *     description: Retrieve a list of products, with optional pagination (`p` for page, `s` for size).
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: p
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: s
 *         schema:
 *           type: integer
 *           example: 20
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                   description:
 *                     type: string
 *                     description: A brief description of the product.
 *                   category:
 *                     type: string
 *                     description: The category of the product.
 *                   stock:
 *                     type: number
 *                     description: The available stock of the product.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update an existing product.
 *     description: Update product details by providing the product ID and fields to be updated.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Updated Product A"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 30.99
 *               description:
 *                 type: string
 *                 description: A brief description of the product.
 *                 example: "Updated high-quality product."
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *                 example: "Home Appliances"
 *               stock:
 *                 type: number
 *                 description: The available stock of the product.
 *                 example: 200
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Invalid input or product not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a product by ID.
 *     description: Delete a product using its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       400:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */

productRouter.post('/', ProductController.createProduct);
productRouter.get('/', ProductController.getProduct);
productRouter.put('/:id', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProduct);

export default productRouter;
