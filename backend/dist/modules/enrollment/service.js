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
exports.EnrollmentService = void 0;
const service_1 = require("../student/service");
const model_1 = require("./model");
class Service {
    createEnrollment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Enrollment.create(data);
            yield service_1.StudentService.addNewCourse(data.studentObjectId, data.courseId);
        });
    }
    getEnrollmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Enrollment.findById(id)
                .populate("userId", "name email")
                .populate("courseId", "title description")
                .exec();
        });
    }
    updateEnrollment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Enrollment.findByIdAndUpdate(id, data);
        });
    }
    deleteEnrollment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Enrollment.findByIdAndDelete(id);
        });
    }
    getEnrollments(filter_1) {
        return __awaiter(this, arguments, void 0, function* (filter, page = 1, limit = 10, sort = { enrollmentDate: -1 }) {
            const skip = (page - 1) * limit;
            const enrollments = yield model_1.Enrollment.find(filter)
                .populate("userId", "name email")
                .populate("courseId", "title description")
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec();
            const total = yield model_1.Enrollment.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);
            return {
                enrollments,
                total,
                page,
                totalPages,
            };
        });
    }
    searchEnrollments(searchQuery_1) {
        return __awaiter(this, arguments, void 0, function* (searchQuery, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const filter = {
                $or: [
                    { "userId.name": { $regex: searchQuery, $options: "i" } },
                    { "courseId.title": { $regex: searchQuery, $options: "i" } },
                ],
            };
            const enrollments = yield model_1.Enrollment.find(filter)
                .populate("userId", "name email")
                .populate("courseId", "title description")
                .skip(skip)
                .limit(limit)
                .exec();
            const total = yield model_1.Enrollment.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);
            return {
                enrollments,
                total,
                page,
                totalPages,
            };
        });
    }
}
exports.EnrollmentService = new Service();
