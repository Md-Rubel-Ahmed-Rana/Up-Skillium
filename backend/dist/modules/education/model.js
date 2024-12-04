"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Education = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const educationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    degree: {
        type: String,
        required: true,
    },
    fieldOfStudy: {
        type: String,
    },
    institution: {
        type: String,
        required: true,
    },
    isCurrent: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
    },
}, schemaOption_1.default);
exports.Education = (0, mongoose_1.model)("Education", educationSchema);
