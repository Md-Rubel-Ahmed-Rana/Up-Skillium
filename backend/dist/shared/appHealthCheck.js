"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckRoute = void 0;
const healthCheckRoute = (app) => {
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });
};
exports.healthCheckRoute = healthCheckRoute;
