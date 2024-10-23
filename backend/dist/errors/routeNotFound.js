"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRouteNotFound = void 0;
const expressRouteNotFound = (app) => {
    return app.use((req, res, next) => {
        const error = new Error(`Not Found - ${req.originalUrl}`);
        res.status(404);
        next(error);
    });
};
exports.expressRouteNotFound = expressRouteNotFound;
