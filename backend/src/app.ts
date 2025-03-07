import express, { Application } from "express";
import dotenv from "dotenv";
import { RootRoutes } from "./modules/routes";
import { expressMiddlewares } from "./middlewares/expressMiddlewares";
import globalErrorHandler from "./errors/globalErrorHandler";
import { expressRouteNotFound } from "./errors/routeNotFound";
import { healthCheckRoute } from "./shared/appHealthCheck";

dotenv.config();

const app: Application = express();

// express middlewares
expressMiddlewares(app);

// root route for app health check
healthCheckRoute(app);

// application routes
app.use("/api/v1", RootRoutes);

// 404 not found error
expressRouteNotFound(app);

// server error
app.use(globalErrorHandler.globalErrorHandler);

export default app;
