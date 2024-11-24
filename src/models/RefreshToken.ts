import { Schema, model, Document } from 'mongoose';
export interface IRefreshToken extends Document {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiredAt?: Date;
  usersId: string;
  token?: string;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  usersId: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: false
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

const RefreshToken = model<IRefreshToken>('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
