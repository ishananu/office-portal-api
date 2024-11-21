import mongoose from 'mongoose';

class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private connect(): void {
    mongoose
      .connect('mongodb://localhost:27017/mydatabase')
      .then(() => console.log('Database connected successfully'))
      .catch((error) => console.error('Database connection error:', error));
  }
}
export { Database };
export default Database.getInstance();
