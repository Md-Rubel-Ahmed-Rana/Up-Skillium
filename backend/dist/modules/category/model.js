"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, schemaOption_1.default);
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
