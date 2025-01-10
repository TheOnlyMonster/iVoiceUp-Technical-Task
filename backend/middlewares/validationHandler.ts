import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError as ExpressValidatorError } from 'express-validator';
import { CustomError } from '../errors/CustomError';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }

  next();
};
