"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_2 = require("../config/cors");
const expressMiddlewares = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)(cors_2.corsConfig));
    app.use((0, helmet_1.default)());
    // app.use(apiRateLimiter.limitAPIRequest());
    app.use((0, cookie_parser_1.default)());
    app.use((0, morgan_1.default)("dev"));
};
exports.expressMiddlewares = expressMiddlewares;
