import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  secretQuestion: { type: String, required: true },
  secretAnswer: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
