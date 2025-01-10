import { ValidationError as ExpressValidatorError } from 'express-validator';

export class ValidationError extends Error {
  statusCode: number;

  constructor(error: ExpressValidatorError) {
    super(error.msg.toString());
    this.statusCode = 400; 
  }
}
