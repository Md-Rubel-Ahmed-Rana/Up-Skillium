"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const adminSchema = new mongoose_1.Schema({
    bio: { type: String },
    adminId: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    socialLinks: {
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
    },
}, schemaOption_1.default);
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);