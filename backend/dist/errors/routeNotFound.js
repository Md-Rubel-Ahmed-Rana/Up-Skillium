"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRouteNotFound = void 0;
const expressRouteNotFound = (app) => {
    return app.use((req, res, next) => {
        return res.sendFile("notFound.html", { root: "public" });
    });
};
exports.expressRouteNotFound = expressRouteNotFound;
