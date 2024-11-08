"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = exports.lessonSchema = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const model_1 = require("../module/model");
exports.lessonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    module: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    serial: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    videoLength: {
        type: Number,
    },
    quizQuestions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Quiz", default: [] }],
}, schemaOption_1.default);
exports.lessonSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        yield model_1.Module.findByIdAndUpdate(doc.module, {
            $push: { lessons: doc._id },
        });
    });
});
exports.Lesson = (0, mongoose_1.model)("Lesson", exports.lessonSchema);
