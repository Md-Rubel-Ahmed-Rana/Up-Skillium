import { rateLimit } from "express-rate-limit";

class Limiter {
  limitAPIRequest(
    timeInMinutes?: number,
    totalRequest?: number,
    message?: string
  ) {
    return rateLimit({
      windowMs: timeInMinutes ? timeInMinutes : 60 * 60 * 1000, // 1 hour
      max: totalRequest, // limit each IP to 100 requests per windowMs
      message:
        message || "Too many requests from this IP, please try again later",
    });
  }
}

export default new Limiter();
