import { Schema, model, Document } from 'mongoose';
export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;
