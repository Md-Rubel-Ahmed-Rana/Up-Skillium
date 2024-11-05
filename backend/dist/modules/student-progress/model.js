"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentProgress = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const lessonSchema = new mongoose_1.Schema({
    lesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Lesson",
    },
    isLessonCompleted: {
        type: Boolean,
        default: false,
    },
}, { _id: false });
const moduleSchema = new mongoose_1.Schema({
    module: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Module",
    },
    isModuleCompleted: {
        type: Boolean,
        default: false,
    },
    lessons: {
        type: [lessonSchema],
        required: true,
    },
}, { _id: false });
const courseSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    isCourseCompleted: {
        type: Boolean,
        default: false,
    },
    completionPercentage: {
        type: Number,
        default: 0,
    },
    lastCompletedLesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lesson",
    },
    modules: {
        type: [moduleSchema],
        required: true,
    },
}, { _id: false });
const studentProgressSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    courses: {
        type: [courseSchema],
        required: true,
    },
}, schemaOption_1.default);
exports.StudentProgress = (0, mongoose_1.model)("StudentProgress", studentProgressSchema);
