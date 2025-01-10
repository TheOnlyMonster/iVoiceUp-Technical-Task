import { ValidationError as ExpressValidatorError, Result } from 'express-validator';

export class ValidationError extends Error {
  statusCode: number;

  constructor(errors: Result<ExpressValidatorError>) {
    const extractedErrors = errors.array().map((err: ExpressValidatorError) => err.msg);
    super(extractedErrors.toString());
    this.statusCode = 400; 
  }
}
