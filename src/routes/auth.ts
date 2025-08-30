import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, secretQuestion, secretAnswer } = req.body;
    if (!email || !password || !secretQuestion || !secretAnswer) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    // For simplicity, store secretAnswer hashed as well
    const secretHashed = await bcrypt.hash(secretAnswer, 10);
    const user = await User.create({ email, password: hashed, secretQuestion, secretAnswer: secretHashed });
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
    return res.json({ token });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});

// Step 1: return the stored secret question (never the answer)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email not found' });
  return res.json({ secretQuestion: user.secretQuestion });
});

// Step 2: validate answer
router.post('/validate-answer', async (req, res) => {
  const { email, answer } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ valid: false, message: 'Email not found' });
  const valid = await bcrypt.compare(answer, user.secretAnswer);
  return res.json({ valid });
});

// Step 3: reset password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email not found' });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return res.json({ message: 'Password reset successfully' });
});

export default router;
