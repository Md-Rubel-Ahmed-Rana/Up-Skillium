"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckRoute = void 0;
const healthCheckRoute = (app) => {
    app.get("/", (req, res) => {
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Up Skillium server is up and running",
            data: null,
        });
    });
};
exports.healthCheckRoute = healthCheckRoute;
