export class EmployeeNotFoundError extends Error {
  statusCode: number;

  constructor(message = 'Employee not found.') {
    super(message);
    this.statusCode = 404;

    Object.setPrototypeOf(this, EmployeeNotFoundError.prototype);
  }
}
