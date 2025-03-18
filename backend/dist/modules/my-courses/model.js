"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCourse = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const myCourseSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    completedLessons: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Lesson",
    },
    completionPercentage: {
        type: Number,
        default: 0,
    },
    lastCompletedLesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lesson",
    },
    nextLesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lesson",
    },
    isCourseCompleted: {
        type: Boolean,
        default: false,
    },
}, schemaOption_1.default);
exports.MyCourse = (0, mongoose_1.model)("MyCourse", myCourseSchema);
