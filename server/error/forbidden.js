import CustomAPIError from "./customError.js";

class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
