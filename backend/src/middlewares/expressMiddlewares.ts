import path from "path";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { corsConfig } from "../config/cors";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import { traceMiddleware } from "./trace.middleware";
import config from "@/config/envConfig";
import { HttpStatusCode } from "@/lib/httpStatus";

export const expressMiddlewares = (app: Application) => {
  Bugsnag.start({
    apiKey: config.bugsnag.apiKey,
    plugins: [BugsnagPluginExpress],
  });
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsConfig));
  app.use(helmet());
  // app.use(apiRateLimiter.limitAPIRequest());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(traceMiddleware);
};

export const notFoundRoutes = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const resObject = {
      statusCode: HttpStatusCode.NOT_FOUND,
      success: false,
      message: "API endpoint not found.",
      method: req.method,
      traceId: req.traceId || null,
      user: {
        id: req.user?.id || "Unknown",
        email: req.user?.email || "Unknown",
      },
      errorMessages: [
        {
          path: req.originalUrl,
          message: "The requested API endpoint does not exist.",
        },
      ],
    };
    console.log(`User hit: '${req.originalUrl}' is not exist`);

    Bugsnag.notify(new Error("Server API Not Found"), (event) => {
      event.addMetadata("[404 not found]", resObject);
    });
    res.status(HttpStatusCode.NOT_FOUND).json(resObject);
    next();
  });
};
