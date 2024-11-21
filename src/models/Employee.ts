import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define the schema
const EmployeeSchema = new Schema<IEmployee>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const Employee = model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
