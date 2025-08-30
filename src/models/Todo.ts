import mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  completed: boolean;
  dueDate: string;
  scheduledDate: string;
  isImportant: boolean;
  category?: string;
}

const todoSchema = new mongoose.Schema<ITodo>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: String, required: true },
  scheduledDate: { type: String, required: true },
  isImportant: { type: Boolean, default: false },
  category: { type: String }
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', todoSchema);
