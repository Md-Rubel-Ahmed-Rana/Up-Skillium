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
exports.StudentProgressController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createStudentProgress = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.StudentProgressService.createOrUpdateStudentProgress(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Student progress created successfully",
                data: null,
            });
        }));
        this.getStudentProgress = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const data = yield service_1.StudentProgressService.getStudentProgress(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Student progress retrieved successfully",
                data: data,
            });
        }));
        this.getSingleCourseProgress = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const courseId = req.params.courseId;
            const data = yield service_1.StudentProgressService.getSingleCourseProgress(userId, courseId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course progress retrieved successfully",
                data: data,
            });
        }));
        this.completeLesson = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const courseId = req.params.courseId;
            const moduleId = req.params.moduleId;
            const lessonId = req.params.lessonId;
            yield service_1.StudentProgressService.completeLesson(userId, courseId, moduleId, lessonId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Lesson marked as completed!",
                data: null,
            });
        }));
        this.assignmentLessonMarkAsSubmitted = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const courseId = req.params.courseId;
            const moduleId = req.params.moduleId;
            const lessonId = req.params.lessonId;
            yield service_1.StudentProgressService.assignmentLessonMarkAsSubmitted(userId, courseId, moduleId, lessonId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment lesson marked as submitted!",
                data: null,
            });
        }));
        this.quizLessonMarkAsSubmitted = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const courseId = req.params.courseId;
            const moduleId = req.params.moduleId;
            const lessonId = req.params.lessonId;
            yield service_1.StudentProgressService.quizLessonMarkAsSubmitted(userId, courseId, moduleId, lessonId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Quiz lesson marked as submitted!",
                data: null,
            });
        }));
    }
}
exports.StudentProgressController = new Controller();
