"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSubmission = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const modifiedAnswerSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    givenAnswer: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
}, { _id: false });
const quizSubmissionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
    },
    totalQuiz: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    wrongAnswers: {
        type: Number,
        required: true,
    },
    modifiedQuizAnswers: {
        type: [modifiedAnswerSchema],
        required: true,
    },
}, schemaOption_1.default);
exports.QuizSubmission = (0, mongoose_1.model)("QuizSubmission", quizSubmissionSchema);
