"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseOutline = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const moduleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    serial: { type: Number, required: true },
}, schemaOption_1.default);
const courseOutlineSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    modules: [moduleSchema],
}, schemaOption_1.default);
exports.CourseOutline = (0, mongoose_1.model)("CourseOutline", courseOutlineSchema);
