"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const envConfig_1 = __importDefault(require("./envConfig"));
exports.corsConfig = {
    origin: JSON.parse(envConfig_1.default.app.corsOrigins),
    credentials: true,
};
