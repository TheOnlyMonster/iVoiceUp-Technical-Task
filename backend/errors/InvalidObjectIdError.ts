export class InvalidObjectIdError extends Error {
  statusCode: number;

  constructor(message = 'Invalid ID format.') {
    super(message);
    this.statusCode = 400; 

    Object.setPrototypeOf(this, InvalidObjectIdError.prototype);
  }
}
