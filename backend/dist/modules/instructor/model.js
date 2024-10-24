"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instructor = void 0;
const mongoose_1 = require("mongoose");
const instructorSchema = new mongoose_1.Schema({
    bio: { type: String, required: true },
    teacherId: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
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
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
exports.Instructor = (0, mongoose_1.model)("Instructor", instructorSchema);
