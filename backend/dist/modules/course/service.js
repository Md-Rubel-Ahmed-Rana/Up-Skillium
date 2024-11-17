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
exports.CourseService = void 0;
const model_1 = require("./model");
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
const service_1 = require("../instructor/service");
class Service {
    createCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Course.create(data);
        });
    }
    getCourses() {
        return __awaiter(this, arguments, void 0, function* (search = "", page = 1, limit = 5, filters = {}) {
            const searchQuery = search
                ? {
                    $or: [
                        { title: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } },
                        { tags: { $regex: search, $options: "i" } },
                    ],
                }
                : {};
            let filterQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (filters.category && { category: filters.category })), (filters.level && { level: filters.level })), (filters.status && { status: filters.status }));
            if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
                filterQuery["price.salePrice"] = Object.assign(Object.assign({}, (filters.minPrice !== undefined && { $gte: filters.minPrice })), (filters.maxPrice !== undefined && { $lte: filters.maxPrice }));
            }
            const skip = (page - 1) * limit;
            const courses = yield model_1.Course.find(filterQuery)
                .populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { name: 1, image: 1 },
                },
            ])
                .skip(skip)
                .limit(limit)
                .exec();
            return courses;
        });
    }
    getSingleCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Course.findById(id).populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { name: 1, image: 1 },
                },
                {
                    path: "students",
                    model: "User",
                    select: { name: 1, image: 1 },
                },
                {
                    path: "reviews",
                    model: "User",
                    select: { name: 1, image: 1 },
                },
            ]);
        });
    }
    getCoursesByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.Course.find({ instructor: instructorId });
            return courses;
        });
    }
    getMyStudentsByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.Course.find({ instructor: instructorId }).populate("students", "name email image");
            const students = [];
            courses.forEach((course) => {
                var _a;
                (_a = course === null || course === void 0 ? void 0 : course.students) === null || _a === void 0 ? void 0 : _a.forEach((student) => {
                    students.push(student);
                });
            });
            return students;
        });
    }
    updateCourse(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Course.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Course.findByIdAndDelete(id);
        });
    }
    updateCourseBasicInfo(courseId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Course.findByIdAndUpdate(courseId, {
                $set: {
                    title: data === null || data === void 0 ? void 0 : data.title,
                    category: data === null || data === void 0 ? void 0 : data.category,
                    description: data === null || data === void 0 ? void 0 : data.description,
                    duration: data === null || data === void 0 ? void 0 : data.duration,
                    level: data === null || data === void 0 ? void 0 : data.level,
                    status: data === null || data === void 0 ? void 0 : data.status,
                },
            });
        });
    }
    updateCoursePrice(courseId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Course.findByIdAndUpdate(courseId, {
                $set: { price: Object.assign({}, data) },
            });
        });
    }
    updateCourseTagsTechnologies(courseId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Course.findByIdAndUpdate(courseId, {
                $set: { tags: data === null || data === void 0 ? void 0 : data.tags, technologies: data === null || data === void 0 ? void 0 : data.technologies },
            });
        });
    }
    updateCourseInstructor(courseId, instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield model_1.Course.findById(courseId);
            yield service_1.InstructorService.resignInstructorFromCourse(course === null || course === void 0 ? void 0 : course.instructor, courseId);
            yield model_1.Course.findByIdAndUpdate(courseId, {
                $set: { instructor: instructorId },
            });
            yield service_1.InstructorService.assignCourseToInstructor(instructorId, courseId);
        });
    }
    updateCourseImage(id, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield model_1.Course.findById(id);
            if (course && (course === null || course === void 0 ? void 0 : course.image)) {
                yield fileUploaderMiddleware_1.FileUploadMiddleware.deleteSingle(course === null || course === void 0 ? void 0 : course.image);
            }
            yield model_1.Course.findByIdAndUpdate(id, { $set: { image: imageUrl } });
        });
    }
    updateCourseIntroductoryVideo(id, videoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield model_1.Course.findById(id);
            if (course && (course === null || course === void 0 ? void 0 : course.introductoryVideo)) {
                yield fileUploaderMiddleware_1.FileUploadMiddleware.deleteSingle(course === null || course === void 0 ? void 0 : course.introductoryVideo);
            }
            yield model_1.Course.findByIdAndUpdate(id, {
                $set: { introductoryVideo: videoUrl },
            });
        });
    }
}
exports.CourseService = new Service();
