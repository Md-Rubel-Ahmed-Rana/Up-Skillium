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
exports.QuizService = void 0;
const service_1 = require("../lesson/service");
const model_1 = require("./model");
class Service {
    createQuiz(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuizzes = yield model_1.Quiz.create(data.quizzes);
            const quizIds = newQuizzes.map((quiz) => quiz._id);
            yield service_1.LessonService.createLesson(Object.assign(Object.assign({}, data.lesson), { quizQuestions: quizIds }));
        });
    }
    getAllQuizzes() {
        return __awaiter(this, arguments, void 0, function* (search = "", moduleId, page = 1, limit = 10) {
            const searchQuery = Object.assign(Object.assign({}, (search && { question: { $regex: search, $options: "i" } })), (moduleId && { moduleId }));
            const skip = (page - 1) * limit;
            const quizzes = yield model_1.Quiz.find(searchQuery)
                .populate("module", "title serial")
                .skip(skip)
                .limit(limit)
                .exec();
            return quizzes;
        });
    }
    getQuizzesByModuleId(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Quiz.find({ moduleId: moduleId });
        });
    }
    getSingleQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Quiz.findById(id);
        });
    }
    updateQuiz(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Quiz.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Quiz.findByIdAndDelete(id);
        });
    }
    checkAndCalculateQuizAnswers(givenAnswers) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalQuiz = givenAnswers.length;
            let correctAnswers = 0;
            let wrongAnswers = 0;
            const modifiedQuizAnswers = [];
            const quizIds = givenAnswers.map((answer) => answer.id);
            const findQuizzes = yield model_1.Quiz.find({ _id: { $in: quizIds } });
            const quizMap = new Map(findQuizzes.map((quiz) => [quiz === null || quiz === void 0 ? void 0 : quiz._id.toString(), quiz]));
            for (const givenAnswer of givenAnswers) {
                const quiz = quizMap.get(givenAnswer === null || givenAnswer === void 0 ? void 0 : givenAnswer.id);
                if (quiz) {
                    const isCorrect = quiz.correctAnswer === givenAnswer.answer;
                    if (isCorrect) {
                        correctAnswers++;
                    }
                    else {
                        wrongAnswers++;
                    }
                    modifiedQuizAnswers.push({
                        question: quiz.question,
                        givenAnswer: givenAnswer.answer,
                        correctAnswer: quiz.correctAnswer,
                        isCorrect,
                    });
                }
            }
            return {
                totalQuiz,
                correctAnswers,
                wrongAnswers,
                modifiedQuizAnswers,
            };
        });
    }
    updateManyQuizzes(quizzes) {
        return __awaiter(this, void 0, void 0, function* () {
            const operations = quizzes.map((quiz) => ({
                updateOne: {
                    filter: { _id: quiz.id },
                    update: { $set: quiz },
                },
            }));
            yield model_1.Quiz.bulkWrite(operations);
        });
    }
    createNewQuizFromLessonUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuizzes = yield model_1.Quiz.create(data);
            return newQuizzes.map((quiz) => quiz === null || quiz === void 0 ? void 0 : quiz._id);
        });
    }
}
exports.QuizService = new Service();
