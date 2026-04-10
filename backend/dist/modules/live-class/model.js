"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const liveClassSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    students: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
    },
    startDateTime: {
        type: String,
        required: true,
    },
    endDateTime: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed", "cancelled"],
        default: "upcoming",
    },
    meetingLink: {
        type: String,
        required: true,
    },
    recordingLink: {
        type: String,
    },
    topics: [String],
    tags: [String],
}, schemaOption_1.default);
const LiveClass = (0, mongoose_1.model)("LiveClass", liveClassSchema);
exports.default = LiveClass;
