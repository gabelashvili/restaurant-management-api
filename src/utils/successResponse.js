class SuccessResponse {
  data = null;

  success = true;

  message = null;

  constructor(data, message) {
    this.data = data;
    this.message = message;
  }
}
export default SuccessResponse;
