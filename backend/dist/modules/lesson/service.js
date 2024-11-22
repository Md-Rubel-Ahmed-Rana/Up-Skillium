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
exports.LessonService = void 0;
const apiError_1 = __importDefault(require("../../shared/apiError"));
const service_1 = require("../quiz/service");
const model_1 = require("./model");
const mongoose_1 = require("mongoose");
class Service {
    createLesson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Lesson.create(data);
        });
    }
    createVideoLesson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Lesson.create(data);
        });
    }
    createQuizLesson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if ((data === null || data === void 0 ? void 0 : data.quizQuestions) && ((_a = data === null || data === void 0 ? void 0 : data.quizQuestions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const createdQuizzes = yield service_1.QuizService.createQuizzes(data === null || data === void 0 ? void 0 : data.quizQuestions);
                yield model_1.Lesson.create(Object.assign(Object.assign({}, data), { quizQuestions: createdQuizzes }));
            }
            else {
                throw new apiError_1.default(400, "Quizzes must be included with lesson data");
            }
        });
    }
    getAllLessons() {
        return __awaiter(this, arguments, void 0, function* (search = "", type, page = 1, limit = 10) {
            const searchQuery = Object.assign(Object.assign({}, (search && { title: { $regex: search, $options: "i" } })), (type && { type }));
            const skip = (page - 1) * limit;
            return yield model_1.Lesson.find(searchQuery)
                .populate("module", "title serial")
                .skip(skip)
                .limit(limit)
                .exec();
        });
    }
    getAllAssignmentLessons() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Lesson.find({ type: "assignment" }).populate("module", "title serial");
        });
    }
    getLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Lesson.findById(id)
                .populate({
                path: "quizQuestions",
                select: "-correctAnswer",
            })
                .exec();
        });
    }
    getLessonByIdWithQuizCorrectAnswer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Lesson.findById(id)
                .populate({
                path: "quizQuestions",
            })
                .exec();
        });
    }
    updateLesson(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Lesson.findByIdAndUpdate(id, Object.assign({}, data)).exec();
        });
    }
    deleteLesson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Lesson.findByIdAndDelete(id).exec();
        });
    }
    updateQuizzesInLesson(lessonId, quizzes) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuizzes = [];
            const oldQuizzes = [];
            quizzes.forEach((quiz) => {
                if (quiz === null || quiz === void 0 ? void 0 : quiz.id) {
                    oldQuizzes.push(quiz);
                }
                else {
                    newQuizzes.push(quiz);
                }
            });
            yield service_1.QuizService.updateManyQuizzes(oldQuizzes);
            const oldQuizIds = oldQuizzes.map((quiz) => new mongoose_1.Types.ObjectId(quiz === null || quiz === void 0 ? void 0 : quiz.id));
            const newQuizIds = yield service_1.QuizService.createNewQuizFromLessonUpdate(newQuizzes);
            const finalQuizIds = oldQuizIds.concat(newQuizIds);
            yield model_1.Lesson.findByIdAndUpdate(lessonId, {
                $set: { quizQuestions: finalQuizIds },
            });
        });
    }
    getLessonsByModule(moduleId_1) {
        return __awaiter(this, arguments, void 0, function* (moduleId, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            return yield model_1.Lesson.find({ module: moduleId })
                .skip(skip)
                .limit(limit)
                .exec();
        });
    }
}
exports.LessonService = new Service();
