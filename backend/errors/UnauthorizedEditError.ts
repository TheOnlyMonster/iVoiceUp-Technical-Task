export class UnauthorizedEditError extends Error {
  statusCode: number;

  constructor(message = 'Cannot edit HR employee.') {
    super(message);
    this.statusCode = 403;

    Object.setPrototypeOf(this, UnauthorizedEditError.prototype);
  }
}
