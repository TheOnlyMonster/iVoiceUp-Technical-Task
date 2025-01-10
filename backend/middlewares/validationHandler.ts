import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError as ExpressValidatorError } from 'express-validator';
import { ValidationError } from '../errors/ValidationError';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors);
  }

  next();
};
