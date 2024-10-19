import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { RootRoutes } from "./routes/root.routes";
import apiRateLimiter from "./config/apiRateLimiter";
import fs from "fs";
import path from "path";
import { Worker } from "worker_threads";
import handleZodValidationError from "./errors/validationError";

dotenv.config();

const app: Application = express();
// const app = createServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(apiRateLimiter.limitAPIRequest());

// Create a worker thread for logging
const loggerWorker = new Worker(
  path.join(__dirname, "../dist/workers/loggerWorker.js")
);
// Middleware to log requests using Morgan and direct logs to the worker
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        loggerWorker.postMessage(message.trim());
      },
    },
  })
);

// application routes
app.use("/api/v1", RootRoutes);

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../public", "index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.send(data);
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ZodError") {
    const errors = handleZodValidationError(err);
    res.status(err.status || 500).json({
      message: "Validation error. Invalid data provided",
      errors,
    });
  } else {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  }
});

export default app;
