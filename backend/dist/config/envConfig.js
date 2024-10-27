"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        port: Number(process.env.PORT),
        env: process.env.NODE_ENV,
        corsOrigins: process.env.CORS_ORIGINS,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE,
        refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    },
};
exports.default = config;
