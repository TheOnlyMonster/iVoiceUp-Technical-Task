import { body } from 'express-validator';

export const signInValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(), 

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
