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
const service_1 = require("../lesson/service");
const model_1 = require("./model");
class Service {
    submitQuiz(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.QuizSubmission.create(data);
            yield service_1.LessonService.quizLessonMarkAsSubmitted(data === null || data === void 0 ? void 0 : data.lessonId);
        });
    }
    getSubmittedQuizResultByLessonId(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.QuizSubmission.findOne({ lessonId });
        });
    }
}
exports.QuizSubmissionService = new Service();
