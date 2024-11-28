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
exports.QuizSubmissionService = void 0;
const model_1 = require("./model");
const service_1 = require("../student-progress/service");
const service_2 = require("../quiz/service");
class Service {
    submitQuiz(userId, courseId, moduleId, lessonId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service_2.QuizService.checkAndCalculateQuizAnswers(data);
            const newData = Object.assign(Object.assign({}, result), { user: userId, lesson: lessonId });
            yield model_1.QuizSubmission.create(newData);
            yield service_1.StudentProgressService.quizLessonMarkAsSubmitted(userId, courseId, moduleId, lessonId);
        });
    }
    getSubmittedQuizResultByLessonId(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.QuizSubmission.findOne({ lesson: lessonId }).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "lesson",
                    model: "Lesson",
                },
            ]);
        });
    }
    getAllQuizSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.QuizSubmission.find({}).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "lesson",
                    model: "Lesson",
                },
            ]);
        });
    }
}
exports.QuizSubmissionService = new Service();
