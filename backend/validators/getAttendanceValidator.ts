import { query, ValidationChain } from 'express-validator';

export const getAttendanceValidator: ValidationChain[] = [
  query('employeeId')
    .exists().withMessage('Employee ID is required.')
    .isMongoId().withMessage('Invalid Employee ID format.'),
  query('page')
    .optional()
    .isNumeric().withMessage('Page must be a number.'),
];