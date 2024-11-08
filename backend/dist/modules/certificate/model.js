"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const certificateSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    course: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    certificateUrl: {
        type: String,
        required: true,
    },
}, schemaOption_1.default);
exports.Certificate = (0, mongoose_1.model)("Certificate", certificateSchema);
