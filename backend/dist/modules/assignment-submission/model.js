"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentSubmission = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const submissionSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    file: { type: String },
});
const assignmentSubmissionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    lessonId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lesson", required: true },
    status: { type: String, enum: ["pending", "checked"], default: "pending" },
    fullMark: { type: Number },
    yourMark: { type: Number },
    submission: { type: submissionSchema, required: true },
    submittedAt: { type: Date, default: Date.now },
    checkedAt: { type: Date },
    feedback: { type: String },
    isLate: { type: Boolean, default: false },
    dueDate: { type: Date },
}, schemaOption_1.default);
exports.AssignmentSubmission = (0, mongoose_1.model)("AssignmentSubmission", assignmentSubmissionSchema);
