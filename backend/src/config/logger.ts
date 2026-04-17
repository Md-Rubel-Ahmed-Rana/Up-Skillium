import pino, { LoggerOptions } from "pino";

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

const options: LoggerOptions = {
  level: isProduction ? "info" : "debug",
  base: {
    service: process.env.APP_NAME || "my-app",
    env,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "request.headers.authorization",
      "request.headers.cookie",
      "password",
      "confirmPassword",
      "token",
      "accessToken",
      "refreshToken",
      "*.password",
      "*.token",
      "*.accessToken",
      "*.refreshToken",
    ],
    censor: "[REDACTED]",
  },
};

export const logger = isProduction
  ? pino(options)
  : pino({
      ...options,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    });
