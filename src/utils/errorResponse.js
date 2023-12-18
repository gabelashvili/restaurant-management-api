class ErrorResponse extends Error {
  statusCode;

  desc;

  constructor(statusCode, message, desc) {
    super(message);
    this.statusCode = statusCode;
    if (desc) {
      this.desc = desc;
    } else {
      this.desc = message;
    }
  }
}
export default ErrorResponse;
