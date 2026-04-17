import express, { Application } from "express";
import dotenv from "dotenv";
import Bugsnag from "@bugsnag/js";
import {
  expressMiddlewares,
  notFoundRoutes,
} from "./middlewares/expressMiddlewares";
import { healthCheckRoute } from "./shared/appHealthCheck";
import { RootRoutes } from "./modules/routes";
import globalErrorHandler from "errors/globalErrorHandler";
import { httpLogger } from "./config/http-logger";
import { requestContextMiddleware } from "./middlewares/request-context";
import { bugsnagContextMiddleware } from "./middlewares/bugsnag-context";
import { JwtInstance } from "./lib/jwt";

dotenv.config();

const app: Application = express();

// express middlewares
expressMiddlewares(app);

// Early attach user info if exist
app.use(JwtInstance.verifyAuthTokenForPublicRoute);

const BugsnagMiddleware = Bugsnag.getPlugin("express");

if (BugsnagMiddleware) {
  app.use(BugsnagMiddleware.requestHandler);
}

app.use(httpLogger);
app.use(requestContextMiddleware);
app.use(bugsnagContextMiddleware);
// root route for app health check
healthCheckRoute(app);

// application routes
app.use("/api/v1", RootRoutes);

// app route not found
notFoundRoutes(app);

if (BugsnagMiddleware) {
  app.use(BugsnagMiddleware.errorHandler);
}

// server error
app.use(globalErrorHandler.globalErrorHandler);

export default app;
