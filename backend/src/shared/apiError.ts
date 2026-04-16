/**
 * API Error
 * ----------
 * A custom error class that extends the native JavaScript `Error` object.
 * Used to handle HTTP-related errors in a consistent way across the application.
 *
 * @example
 * ```ts
 * throw new ApiError(404, "User not found");
 * ```
 *
 * This allows your global error handler (middleware) to send structured
 * responses with proper status codes and messages.
 */
class ApiError extends Error {
  /**
   * HTTP status code representing the error (e.g., 400, 404, 500).
   */
  public statusCode: number;

  /**
   * Creates an instance of `ApiError`.
   *
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} message - A descriptive error message.
   * @param {string} [stack] - Optional custom stack trace for debugging.
   *
   * @example
   * ```ts
   * // Basic usage
   * throw new ApiError(400, "Invalid request data");
   *
   * // With a custom stack trace
   * throw new ApiError(500, "Internal server error", "CustomStackInfo");
   * ```
   */
  constructor(statusCode: number, message: string | undefined, stack = "") {
    super(message);
    this.statusCode = statusCode;

    // Attach custom stack trace if provided, otherwise capture from constructor
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
