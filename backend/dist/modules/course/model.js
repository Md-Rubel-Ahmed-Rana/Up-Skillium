"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    price: {
        original: { type: Number, required: true },
        discount: { type: Number, required: true },
        salePrice: { type: Number, required: true },
    },
    tags: { type: [String], required: true },
    category: { type: String, required: true },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
    },
    duration: { type: String, required: true },
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    ratings: {
        averageRating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
    },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },
}, schemaOption_1.default);
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
