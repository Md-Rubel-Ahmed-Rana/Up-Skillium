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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const service_1 = require("../quiz/service");
const model_1 = require("./model");
const mongoose_1 = require("mongoose");
class Service {
    createLesson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Lesson.create(data);
        });
    }
    getAllLessons() {
        return __awaiter(this, arguments, void 0, function* (search = "", type, page = 1, limit = 10) {
            const searchQuery = Object.assign(Object.assign({}, (search && { title: { $regex: search, $options: "i" } })), (type && { type }));
            const skip = (page - 1) * limit;
            return yield model_1.Lesson.find(searchQuery).skip(skip).limit(limit).exec();
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
