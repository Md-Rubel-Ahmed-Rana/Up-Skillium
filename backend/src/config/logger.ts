import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

export const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, "../../logs/daily-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "info",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      filename: path.join(__dirname, "../../logs/weekly-%DATE%.log"),
      datePattern: "YYYY-[W]WW",
      level: "info",
      maxFiles: "8w",
    }),
    new DailyRotateFile({
      filename: path.join(__dirname, "../../logs/monthly-%DATE%.log"),
      datePattern: "YYYY-MM",
      level: "info",
      maxFiles: "12m",
    }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});
