class ErrorResponse extends Error {
  statusCode;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default ErrorResponse;
