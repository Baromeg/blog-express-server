import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password are required' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await AuthService.hashPassword(password);

  const user = await User.create({ email, hashedPassword, role });

  return res.status(201).json({ id: user.id, email: user.email });
};
