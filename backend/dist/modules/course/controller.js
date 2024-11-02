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
exports.CourseController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createCourse = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.CourseService.createCourse(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Course created successfully",
                data: null,
            });
        }));
        this.getCourses = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const searchText = req.query.searchText || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const filters = req.query.filters
                ? JSON.parse(req.query.filters)
                : {};
            const courses = yield service_1.CourseService.getCourses(searchText, page, limit, filters);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Courses fetched successfully",
                data: courses,
            });
        }));
        this.getSingleCourse = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const course = yield service_1.CourseService.getSingleCourse(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course fetched successfully",
                data: course,
            });
        }));
        this.updateCourse = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.updateCourse(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course updated successfully",
                data: null,
            });
        }));
        this.deleteCourse = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.deleteCourse(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course deleted successfully",
                data: null,
            });
        }));
        this.updateCourseImage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.updateCourseImage(id, req.url);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course image changed successfully",
                data: null,
            });
        }));
        this.updateCourseIntroductoryVideo = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.updateCourseIntroductoryVideo(id, req.url);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course introductory video uploaded successfully",
                data: null,
            });
        }));
    }
}
exports.CourseController = new Controller();
