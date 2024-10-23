"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
class Limiter {
    limitAPIRequest(timeInMinutes, totalRequest, message) {
        return (0, express_rate_limit_1.rateLimit)({
            windowMs: timeInMinutes ? timeInMinutes : 60 * 60 * 1000, // 1 hour
            max: totalRequest, // limit each IP to 100 requests per windowMs
            message: message || "Too many requests from this IP, please try again later",
        });
    }
}
exports.default = new Limiter();
