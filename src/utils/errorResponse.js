class ErrorResponse extends Error {
  statusCode;

  desc;

  constructor(statusCode, desc, message) {
    super(message);
    this.statusCode = statusCode;
    this.desc = desc;
  }
}
export default ErrorResponse;
