"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const reviewSchema = new mongoose_1.Schema({
    reviewer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviewTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: "reviewToModel",
    },
    reviewToModel: {
        type: String,
        required: true,
        enum: ["User", "Course"],
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}, schemaOption_1.default);
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
