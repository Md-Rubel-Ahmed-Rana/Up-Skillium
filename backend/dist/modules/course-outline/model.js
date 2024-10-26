"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseOutline = void 0;
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
const courseOutlineSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    description: { type: String, required: true },
    modules: [moduleSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.CourseOutline = (0, mongoose_1.model)("CourseOutline", courseOutlineSchema);
