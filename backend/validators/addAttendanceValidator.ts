import { body, ValidationChain } from 'express-validator';

export const addAttendanceValidator: ValidationChain[] = [
  body('employeeId')
    .exists().withMessage('Employee ID is required.')
    .isMongoId().withMessage('Invalid Employee ID format.'),
  body('date')
    .exists().withMessage('Date is required.')
    .isISO8601().withMessage('Invalid date format.'),
  body('status')
    .exists().withMessage('Status is required.')
    .isIn(['Present', 'Absent']).withMessage('Status must be either "Present" or "Absent".'),
];