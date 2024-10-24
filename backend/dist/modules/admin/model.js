"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    bio: { type: String, required: true },
    adminId: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    socialLinks: {
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
    },
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
