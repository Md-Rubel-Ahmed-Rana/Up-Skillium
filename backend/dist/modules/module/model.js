"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const model_1 = require("../lesson/model");
const moduleSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    serial: {
        type: Number,
    },
    lessons: [model_1.lessonSchema],
}, schemaOption_1.default);
exports.Module = (0, mongoose_1.model)("Module", moduleSchema);
