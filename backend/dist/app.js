"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./modules/routes");
const expressMiddlewares_1 = require("./middlewares/expressMiddlewares");
const globalErrorHandler_1 = __importDefault(require("./errors/globalErrorHandler"));
const routeNotFound_1 = require("./errors/routeNotFound");
const appHealthCheck_1 = require("./shared/appHealthCheck");
dotenv_1.default.config();
const app = (0, express_1.default)();
// express middlewares
(0, expressMiddlewares_1.expressMiddlewares)(app);
// root route for app health check
(0, appHealthCheck_1.healthCheckRoute)(app);
// application routes
app.use("/api/v1", routes_1.RootRoutes);
// 404 not found error
(0, routeNotFound_1.expressRouteNotFound)(app);
// server error
app.use(globalErrorHandler_1.default.globalErrorHandler);
exports.default = app;
