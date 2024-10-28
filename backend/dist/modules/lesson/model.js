"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = exports.lessonSchema = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const model_1 = require("../quiz/model");
exports.lessonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    serial: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    videoLength: {
        type: Number,
    },
    quizQuestions: [model_1.quizSchema],
}, schemaOption_1.default);
exports.Lesson = (0, mongoose_1.model)("Lesson", exports.lessonSchema);
