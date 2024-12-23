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
exports.CourseService = void 0;
const model_1 = require("./model");
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
const service_1 = require("../instructor/service");
const incrementAverageRating_1 = __importDefault(require("../../utils/incrementAverageRating"));
const apiError_1 = __importDefault(require("../../shared/apiError"));
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
                    select: { password: 0 },
                },
            ])
                .skip(skip)
                .limit(limit);
            return courses;
        });
    }
    getOnlyPublishedCourses() {
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
            let filterQuery = Object.assign(Object.assign(Object.assign({ status: "published" }, searchQuery), (filters.category && { category: filters.category })), (filters.level && { level: filters.level }));
            if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
                filterQuery["price.salePrice"] = Object.assign(Object.assign({}, (filters.minPrice !== undefined && { $gte: filters.minPrice })), (filters.maxPrice !== undefined && { $lte: filters.maxPrice }));
            }
            const skip = (page - 1) * limit;
            const courses = yield model_1.Course.find(filterQuery)
                .populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { password: 0 },
                },
            ])
                .skip(skip)
                .limit(limit);
            const total = yield model_1.Course.countDocuments({ status: "published" });
            return { courses, totalCourse: total };
        });
    }
    getSingleCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Course.findById(id).populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "students",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "reviews",
                    model: "User",
                    select: { password: 0 },
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
    getCourseIdsByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.Course.find({ instructor: instructorId });
            return courses.map((course) => course === null || course === void 0 ? void 0 : course.id);
        });
    }
    getMyStudentsByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.Course.find({ instructor: instructorId }).populate("students", "name email image");
            const studentMap = new Map();
            courses.forEach((course) => {
                var _a;
                (_a = course === null || course === void 0 ? void 0 : course.students) === null || _a === void 0 ? void 0 : _a.forEach((student) => {
                    const studentId = student === null || student === void 0 ? void 0 : student._id.toString();
                    if (studentMap.has(studentId)) {
                        studentMap.get(studentId).courses.push({
                            id: course === null || course === void 0 ? void 0 : course.id,
                            title: course === null || course === void 0 ? void 0 : course.title,
                            image: course === null || course === void 0 ? void 0 : course.image,
                        });
                    }
                    else {
                        studentMap.set(studentId, {
                            student: student,
                            courses: [
                                {
                                    id: course === null || course === void 0 ? void 0 : course.id,
                                    title: course === null || course === void 0 ? void 0 : course.title,
                                    image: course === null || course === void 0 ? void 0 : course.image,
                                },
                            ],
                        });
                    }
                });
            });
            const organizedData = Array.from(studentMap.values());
            return organizedData;
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
    incrementRatings(id, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const course = yield model_1.Course.findById(id);
            if (!course) {
                throw new apiError_1.default(404, "Course not found");
            }
            yield model_1.Course.findByIdAndUpdate(id, {
                $set: {
                    "ratings.averageRating": (0, incrementAverageRating_1.default)((_a = course === null || course === void 0 ? void 0 : course.ratings) === null || _a === void 0 ? void 0 : _a.totalReviews, (_b = course === null || course === void 0 ? void 0 : course.ratings) === null || _b === void 0 ? void 0 : _b.averageRating, newRating),
                },
                $inc: {
                    "ratings.totalReviews": 1,
                },
            });
        });
    }
    getMatchedRelatedCourses(relatableText) {
        return __awaiter(this, void 0, void 0, function* () {
            let courses = yield model_1.Course.find({
                $text: { $search: relatableText, $caseSensitive: false },
                status: "published",
            })
                .populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { password: 0 },
                },
            ])
                .limit(5);
            if ((courses === null || courses === void 0 ? void 0 : courses.length) === 0) {
                courses = yield model_1.Course.find({ status: "published" })
                    .populate([
                    {
                        path: "instructor",
                        model: "User",
                        select: { password: 0 },
                    },
                ])
                    .sort({ createdAt: -1 })
                    .limit(5);
            }
            return courses;
        });
    }
    getCoursesByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.Course.find({
                category: category,
                status: "published",
            }).populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { password: 0 },
                },
            ]);
            const otherCourses = yield model_1.Course.find({
                category: { $ne: category },
                status: "published",
            })
                .populate([
                {
                    path: "instructor",
                    model: "User",
                    select: { password: 0 },
                },
            ])
                .sort({ createdAt: -1 })
                .limit(6);
            return { courses, otherCourses };
        });
    }
    getStudentsFromCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield model_1.Course.findById(courseId).populate("students", "name email image");
            const students = course === null || course === void 0 ? void 0 : course.students;
            return students;
        });
    }
}
exports.CourseService = new Service();
