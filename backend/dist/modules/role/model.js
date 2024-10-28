"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const rolesSchema = new mongoose_1.Schema({
    role: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
}, schemaOption_1.default);
exports.Role = (0, mongoose_1.model)("Role", rolesSchema);
