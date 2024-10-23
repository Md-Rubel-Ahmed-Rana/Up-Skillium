class ApiError extends Error {
  statusCode: number | string;

  constructor(
    statusCode: number | string,
    message: string | undefined,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
