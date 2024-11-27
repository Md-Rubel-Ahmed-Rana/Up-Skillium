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
        this.getOnlyPublishedCourses = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const searchText = req.query.searchText || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const filters = req.query.filters
                ? JSON.parse(req.query.filters)
                : {};
            const data = yield service_1.CourseService.getOnlyPublishedCourses(searchText, page, limit, filters);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Published courses fetched successfully",
                data: data,
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
        this.getCoursesByInstructor = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const instructorId = req.params.instructorId;
            const course = yield service_1.CourseService.getCoursesByInstructor(instructorId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Courses fetched successfully",
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
        this.updateCourseBasicInfo = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.updateCourseBasicInfo(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course  basic info updated successfully",
                data: null,
            });
        }));
        this.updateCoursePrice = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.updateCoursePrice(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course price updated successfully",
                data: null,
            });
        }));
        this.updateCourseTagsTechnologies = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseService.updateCourseTagsTechnologies(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course tags and technologies updated successfully",
                data: null,
            });
        }));
        this.updateCourseInstructor = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const courseId = req.params.courseId;
            const instructorId = req.params.instructorId;
            yield service_1.CourseService.updateCourseInstructor(courseId, instructorId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course instructor updated successfully",
                data: null,
            });
        }));
        this.getMatchedRelatedCourses = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const relatableText = (_a = req.query) === null || _a === void 0 ? void 0 : _a.relatableText;
            const courses = yield service_1.CourseService.getMatchedRelatedCourses(relatableText);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Related courses retrieved successfully",
                data: courses,
            });
        }));
    }
}
exports.CourseController = new Controller();
