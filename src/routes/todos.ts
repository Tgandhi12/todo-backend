import { Router } from 'express';
import Todo from '../models/Todo';
import auth, { AuthRequest } from '../middleware/auth';

const router = Router();

// All routes require auth
router.use(auth);

router.get('/', async (req: AuthRequest, res) => {
  const items = await Todo.find({ userId: req.user!.id }).sort({ createdAt: -1 });
  return res.json(items);
});

router.post('/', async (req: AuthRequest, res) => {
  const { text, dueDate, scheduledDate, isImportant, category } = req.body;
  if (!text || !dueDate || !scheduledDate) return res.status(400).json({ message: 'Missing fields' });
  const item = await Todo.create({ userId: req.user!.id, text, dueDate, scheduledDate, isImportant: !!isImportant, category });
  return res.status(201).json(item);
});

router.put('/:id', async (req: AuthRequest, res) => {
  const updated = await Todo.findOneAndUpdate({ _id: req.params.id, userId: req.user!.id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  return res.json(updated);
});

router.delete('/:id', async (req: AuthRequest, res) => {
  const del = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user!.id });
  if (!del) return res.status(404).json({ message: 'Not found' });
  return res.status(204).end();
});

export default router;
