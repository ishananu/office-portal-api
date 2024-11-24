// import Product from '../../src/models/Product';
// import ProductService from '../../src/services/product.service';
// import { IPagination } from '../../src/shared/types';

// jest.mock('../../src/models/Product'); // Mock the Product model

// describe('ProductService', () => {
//   // describe('createProduct', () => {
//   //   it('should create a new product and return it', async () => {
//   //     const mockProduct = {
//   //       name: 'Product A',
//   //       price: 100,
//   //       category: 'Category 1'
//   //     };

//   //     // Mock the save method of the Product model
//   //     // const saveMock = jest.fn().mockResolvedValue(mockProduct);
//   //     // jest.spyOn(Product.prototype, 'save').mockImplementation(saveMock);

//   //     const ProductMock = jest.fn().mockImplementation(() => {
//   //       return {
//   //         save: jest.fn().mockResolvedValue(mockProduct)
//   //       };
//   //     });
//   //     jest.mock('@models/Product', () => ProductMock);

//   //     const result = await ProductService.createProduct(mockProduct);

//   //     // Ensure save method is called with the correct product data
//   //     expect(ProductMock).toHaveBeenCalledWith(mockProduct);
//   //     expect(result).toEqual(mockProduct);
//   //   });
//   // });

//   describe('createProduct', () => {
//     it('should create a new product and return it', async () => {
//       const mockProductData = {
//         name: 'Product A',
//         price: 100,
//         category: 'Category 1'
//       };

//       const mockProductInstance = {
//         save: jest.fn().mockResolvedValue(mockProductData)
//       };

//       // Mock the Product constructor to return the mocked instance
//       Product.mockImplementation(() => mockProductInstance);

//       const result = await ProductService.createProduct(mockProductData);

//       // Verify that the Product constructor was called with the correct arguments
//       expect(Product).toHaveBeenCalledWith(mockProductData);

//       // Verify that the save method was called
//       expect(mockProductInstance.save).toHaveBeenCalled();

//       // Check the returned result
//       expect(result).toEqual(mockProductData);
//     });
//   });

//   describe('getProduct', () => {
//     it('should return products with pagination', async () => {
//       const pagination: IPagination = { skip: 1, limit: 10 };
//       const mockProducts = [
//         { name: 'Product A', price: 100, category: 'Category 1' },
//         { name: 'Product B', price: 200, category: 'Category 2' }
//       ];

//       const paginateQueryMock = jest.fn().mockResolvedValue(mockProducts);
//       jest.mock('@shared/helpers', () => ({
//         paginateQuery: paginateQueryMock
//       }));

//       const result = await ProductService.getProduct(pagination);

//       expect(paginateQueryMock).toHaveBeenCalledWith(Product, {}, pagination);
//       expect(result).toEqual(mockProducts);
//     });
//   });

//   describe('updateProduct', () => {
//     it('should update a product and return the updated product', async () => {
//       const mockProduct = {
//         name: 'Updated Product',
//         price: 150,
//         category: 'Updated Category'
//       };
//       const updatedProduct = { ...mockProduct, _id: '12345' };

//       const findByIdAndUpdateMock = jest.fn().mockResolvedValue(updatedProduct);
//       jest
//         .spyOn(Product, 'findByIdAndUpdate')
//         .mockImplementation(findByIdAndUpdateMock);

//       const result = await ProductService.updateProduct('12345', mockProduct);

//       expect(findByIdAndUpdateMock).toHaveBeenCalledWith('12345', mockProduct, {
//         new: true,
//         runValidators: true
//       });
//       expect(result).toEqual(updatedProduct);
//     });
//   });

//   describe('deleteProduct', () => {
//     it('should delete a product and return the deleted product', async () => {
//       const deletedProduct = { _id: '12345', name: 'Product A', price: 100 };

//       const findByIdAndDeleteMock = jest.fn().mockResolvedValue(deletedProduct);
//       jest
//         .spyOn(Product, 'findByIdAndDelete')
//         .mockImplementation(findByIdAndDeleteMock);

//       const result = await ProductService.deleteProduct('12345');

//       expect(findByIdAndDeleteMock).toHaveBeenCalledWith('12345');
//       expect(result).toEqual(deletedProduct);
//     });
//   });
// });
