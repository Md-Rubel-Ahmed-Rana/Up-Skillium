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
exports.QuizController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
const mongoose_1 = require("mongoose");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createQuiz = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.QuizService.createQuiz(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Quiz created successfully",
                data: null,
            });
        }));
        this.getAllQuizzes = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { search = "", moduleId, page = 1, limit = 10 } = req.query;
            const quizzes = yield service_1.QuizService.getAllQuizzes(search, moduleId ? new mongoose_1.Types.ObjectId(moduleId) : undefined, Number(page), Number(limit));
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quizzes fetched successfully",
                data: quizzes,
            });
        }));
        this.getQuizzesByModuleId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { moduleId } = req.params;
            const quizzes = yield service_1.QuizService.getQuizzesByModuleId(new mongoose_1.Types.ObjectId(moduleId));
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quizzes fetched successfully by module ID",
                data: quizzes,
            });
        }));
        this.getSingleQuiz = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const quiz = yield service_1.QuizService.getSingleQuiz(new mongoose_1.Types.ObjectId(id));
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Single quiz fetched successfully",
                data: quiz,
            });
        }));
        this.updateQuiz = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield service_1.QuizService.updateQuiz(new mongoose_1.Types.ObjectId(id), req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz updated successfully",
                data: null,
            });
        }));
        this.deleteQuiz = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield service_1.QuizService.deleteQuiz(new mongoose_1.Types.ObjectId(id));
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz deleted successfully",
                data: null,
            });
        }));
        this.checkAndCalculateQuizAnswers = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const lessonId = req.params.lessonId;
            const data = yield service_1.QuizService.checkAndCalculateQuizAnswers(userId, lessonId, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz calculated successfully",
                data: data,
            });
        }));
    }
}
exports.QuizController = new Controller();
