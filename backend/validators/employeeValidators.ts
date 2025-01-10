import { body } from 'express-validator';

export const addEmployeeValidator = [
  body('fname').isString().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.'),
  body('lname').isString().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.'),
  body('email').isEmail().withMessage('Email is not valid.'),
  body('salary').isNumeric().withMessage('Salary must be a number.'),
];