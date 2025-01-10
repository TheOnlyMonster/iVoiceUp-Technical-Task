import { body, query, ValidationChain } from 'express-validator';

export const addEmployeeValidator: ValidationChain[] = [
  body('fname')
    .exists().withMessage('First name is required.')
    .isString().withMessage('First name must be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.'),
  body('lname')
    .exists().withMessage('Last name is required.')
    .isString().withMessage('Last name must be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.'),
  body('email')
    .exists().withMessage('Email is required.')
    .isEmail().withMessage('Email is not valid.'),
  body('salary')
    .exists().withMessage('Salary is required.')
    .isNumeric().withMessage('Salary must be a number.'),
];

export const editEmployeeValidator: ValidationChain[] = [
  query('id')
    .exists().withMessage('Employee ID is required.'),
  body().custom((value, { req }) => {
    if (!req.body.fname && !req.body.lname && !req.body.email && !req.body.salary) {
      throw new Error('At least one field (fname, lname, email, salary) must be provided.');
    }
    return true;
  }),
  body('fname')
    .optional()
    .isString().withMessage('First name must be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.'),
  body('lname')
    .optional()
    .isString().withMessage('Last name must be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.'),
  body('email')
    .optional()
    .isEmail().withMessage('Email is not valid.'),
  body('salary')
    .optional()
    .isNumeric().withMessage('Salary must be a number.'),
];

export const getEmployeeValidator: ValidationChain[] = [
  query('id')
    .exists().withMessage('Employee ID is required.'),
];

export const viewEmployeesValidator: ValidationChain[] = [
  query('page')
    .optional()
    .isNumeric().withMessage('Page must be a number.'),
];