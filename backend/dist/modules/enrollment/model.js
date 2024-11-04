"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const EnrollmentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    studentObjectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, schemaOption_1.default);
exports.Enrollment = (0, mongoose_1.model)("Enrollment", EnrollmentSchema);
