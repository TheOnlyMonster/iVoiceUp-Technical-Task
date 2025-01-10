import { body, ValidationChain } from 'express-validator';

export const signInValidator: ValidationChain[] = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(), 

  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
