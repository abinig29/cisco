import CustomAPIError from "./customError.js";

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnAuthenticatedError;
