import Employee from './models/Employee';
import Product from './models/Product';

type ModelType = 'Employee' | 'Product';

export class ModelFactory {
  static createModel(type: ModelType) {
    switch (type) {
      case 'Employee':
        return Employee;
      case 'Product':
        return Product;
      default:
        throw new Error(`Unknown model type: ${type}`);
    }
  }
}
