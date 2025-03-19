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
exports.AssignmentSubmissionController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.submit = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.AssignmentSubmissionService.submit(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Assignment submitted successfully",
                data: null,
            });
        }));
        this.getAllSubmission = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.AssignmentSubmissionService.getAllSubmission();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment submissions retrieved successfully",
                data: data,
            });
        }));
        this.getAllPendingSubmissions = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.AssignmentSubmissionService.getAllPendingSubmissions();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Pending submissions retrieved successfully",
                data: data,
            });
        }));
        this.getAllReviewedSubmissions = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.AssignmentSubmissionService.getAllReviewedSubmissions();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Reviewed submissions retrieved successfully",
                data: data,
            });
        }));
        this.getAssignmentSubmissionByLessonId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const lessonId = req.params.lessonId;
            const data = yield service_1.AssignmentSubmissionService.getAssignmentSubmissionByLessonId(userId, lessonId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment submission retrieved successfully",
                data: data,
            });
        }));
        this.updateAssignmentReview = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.AssignmentSubmissionService.updateAssignmentReview(req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment reviewed retrieved successfully",
                data: null,
            });
        }));
        this.updateSubmission = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.AssignmentSubmissionService.updateSubmission(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment reviewed retrieved successfully",
                data: null,
            });
        }));
        this.getPendingAssignmentByInstructor = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const instructorId = req.params.instructorId;
            const data = yield service_1.AssignmentSubmissionService.getPendingAssignmentByInstructor(instructorId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Pending assignments retrieved successfully",
                data: data,
            });
        }));
        this.getCompletedAssignmentByInstructor = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const instructorId = req.params.instructorId;
            const data = yield service_1.AssignmentSubmissionService.getCompletedAssignmentByInstructor(instructorId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Completed assignments retrieved successfully",
                data: data,
            });
        }));
    }
}
exports.AssignmentSubmissionController = new Controller();
