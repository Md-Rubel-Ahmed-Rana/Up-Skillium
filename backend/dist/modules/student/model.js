"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    coursesEnrolled: [mongoose_1.Schema.Types.ObjectId],
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
