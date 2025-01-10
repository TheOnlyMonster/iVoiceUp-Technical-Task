import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export const signIn = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
    }

    const token = await AuthService.signIn(email, password);

    res.status(200).json({ message: 'Sign-in successful.', token });
  } catch (error) {
    next(error);
  }
};
