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
exports.EnrollmentController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createEnrollment = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.EnrollmentService.createEnrollment(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Enrollment created successfully",
                data: null,
            });
        }));
        this.getEnrollmentById = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const enrollment = yield service_1.EnrollmentService.getEnrollmentById(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Enrollment retrieved successfully",
                data: enrollment,
            });
        }));
        this.getSuccessEnrollmentForStudent = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const enrollment = yield service_1.EnrollmentService.getSuccessEnrollmentForStudent(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Enrollments retrieved successfully",
                data: enrollment,
            });
        }));
        this.getOrderEnrollmentHistoryForStudent = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const enrollment = yield service_1.EnrollmentService.getOrderEnrollmentHistoryForStudent(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Order history retrieved successfully",
                data: enrollment,
            });
        }));
        this.updateEnrollment = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.EnrollmentService.updateEnrollment(req.params.id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Enrollment updated successfully",
                data: null,
            });
        }));
        this.deleteEnrollment = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.EnrollmentService.deleteEnrollment(req.params.id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Enrollment deleted successfully",
                data: null,
            });
        }));
        this.getAllOrderHistory = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield service_1.EnrollmentService.getAllOrderHistory();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Order histories retrieved successfully",
                data: result,
            });
        }));
        this.getAllSuccessEnrollments = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield service_1.EnrollmentService.getAllSuccessEnrollments();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Enrollments retrieved successfully",
                data: result,
            });
        }));
        this.searchEnrollments = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { searchQuery = "", page = 1, limit = 10 } = req.query;
            const result = yield service_1.EnrollmentService.searchEnrollments(searchQuery, +page, +limit);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Search results retrieved successfully",
                data: result,
            });
        }));
    }
}
exports.EnrollmentController = new Controller();
