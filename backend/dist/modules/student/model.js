"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const studentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    coursesEnrolled: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
}, schemaOption_1.default);
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
