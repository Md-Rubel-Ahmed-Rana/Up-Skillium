import express, { Application } from "express";
import dotenv from "dotenv";
import Bugsnag from "@bugsnag/js";
import { RootRoutes } from "./modules/routes";
import {
  expressMiddlewares,
  notFoundRoutes,
} from "./middlewares/expressMiddlewares";
import globalErrorHandler from "./errors/globalErrorHandler";
import { healthCheckRoute } from "./shared/appHealthCheck";

dotenv.config();

const app: Application = express();

// express middlewares
expressMiddlewares(app);

const BugsnagMiddleware = Bugsnag.getPlugin("express");

if (BugsnagMiddleware) {
  app.use(BugsnagMiddleware.requestHandler);
}

// root route for app health check
healthCheckRoute(app);

// application routes
app.use("/api/v1", RootRoutes);

// app route not found
notFoundRoutes(app);

// server error
app.use(globalErrorHandler.globalErrorHandler);

if (BugsnagMiddleware) {
  app.use(BugsnagMiddleware.errorHandler);
}

export default app;
