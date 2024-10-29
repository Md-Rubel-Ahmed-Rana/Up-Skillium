"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instructor = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const instructorSchema = new mongoose_1.Schema({
    bio: { type: String },
    teacherId: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Course" }],
    socialLinks: {
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
    },
    ratings: {
        averageRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
    },
}, schemaOption_1.default);
exports.Instructor = (0, mongoose_1.model)("Instructor", instructorSchema);
