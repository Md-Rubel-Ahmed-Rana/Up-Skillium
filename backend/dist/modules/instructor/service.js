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
exports.InstructorService = void 0;
const model_1 = require("./model");
const generateTeacherId_1 = __importDefault(require("./generateTeacherId"));
const service_1 = require("../course/service");
class Service {
    createNewInstructor(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastTeacherId = yield model_1.Instructor.findOne({}).sort({ createdAt: -1 });
            const teacherId = lastTeacherId
                ? (0, generateTeacherId_1.default)(lastTeacherId.teacherId)
                : (0, generateTeacherId_1.default)("US-TE-0000");
            yield model_1.Instructor.create({ user: userId, teacherId });
        });
    }
    getAllInstructors() {
        return __awaiter(this, void 0, void 0, function* () {
            const instructors = yield model_1.Instructor.find({}).populate([
                {
                    path: "user",
                    model: "User",
                    select: { name: 1, email: 1, image: 1 },
                },
                {
                    path: "courses",
                    model: "Course",
                    select: { title: 1, image: 1, category: 1 },
                },
            ]);
            return instructors;
        });
    }
    assignCourseToInstructor(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Instructor.findOneAndUpdate({ user: userId }, {
                $push: { courses: courseId },
            });
        });
    }
    resignInstructorFromCourse(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Instructor.findOneAndUpdate({ user: userId }, {
                $pull: { courses: courseId },
            });
        });
    }
    getMyStudents(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield service_1.CourseService.getMyStudentsByInstructor(instructorId);
            return students;
        });
    }
}
exports.InstructorService = new Service();
