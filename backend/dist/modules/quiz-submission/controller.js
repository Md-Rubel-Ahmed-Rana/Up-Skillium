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
exports.QuizSubmissionController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.getSubmittedQuizResultByLessonId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const lessonId = req.params.lessonId;
            const data = yield service_1.QuizSubmissionService.getSubmittedQuizResultByLessonId(lessonId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz result retrieved successfully",
                data: data,
            });
        }));
        this.submitQuiz = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const lessonId = req.params.lessonId;
            const data = yield service_1.QuizSubmissionService.submitQuiz(userId, lessonId, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz submitted successfully",
                data: data,
            });
        }));
        this.getAllQuizSubmissions = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.QuizSubmissionService.getAllQuizSubmissions();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz submissions retrieved successfully",
                data: data,
            });
        }));
    }
}
exports.QuizSubmissionController = new Controller();
