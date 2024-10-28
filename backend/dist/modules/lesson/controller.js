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
exports.LessonController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createLesson = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.LessonService.createLesson(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Lesson created successfully",
                data: null,
            });
        }));
        this.getAllLessons = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { search = "", type, page = 1, limit = 10 } = req.query;
            const lessons = yield service_1.LessonService.getAllLessons(search, type, Number(page), Number(limit));
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Lessons fetched successfully",
                data: lessons,
            });
        }));
        // Get a single lesson by ID
        this.getLessonById = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const lesson = yield service_1.LessonService.getLessonById(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Lesson fetched successfully",
                data: lesson,
            });
        }));
        this.updateLesson = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield service_1.LessonService.updateLesson(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Lesson updated successfully",
                data: null,
            });
        }));
        this.deleteLesson = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield service_1.LessonService.deleteLesson(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Lesson deleted successfully",
                data: null,
            });
        }));
        this.getLessonsByCourse = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { courseId } = req.params;
            const { page = 1, limit = 10 } = req.query;
            const lessons = yield service_1.LessonService.getLessonsByCourse(courseId, Number(page), Number(limit));
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Lessons for course fetched successfully",
                data: lessons,
            });
        }));
    }
}
exports.LessonController = new Controller();
