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
exports.StudentService = void 0;
const generateStudentId_1 = __importDefault(require("./generateStudentId"));
const model_1 = require("./model");
class Service {
    createNewStudent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastStudent = yield model_1.Student.findOne({}).sort({ createdAt: -1 });
            const studentId = lastStudent
                ? (0, generateStudentId_1.default)(lastStudent.studentId)
                : (0, generateStudentId_1.default)("US-ST-0000");
            yield model_1.Student.create({ user: userId, studentId: studentId });
        });
    }
    addNewCourse(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Student.findOneAndUpdate({ user: userId }, {
                $push: { courses: courseId },
            });
        });
    }
    getMyCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.Student.findOne({ user: userId })
                .populate("courses")
                .populate("user", "-password");
            return data;
        });
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.Student.find({})
                .populate("courses")
                .populate("user", "-password");
            return data;
        });
    }
    getStudentIdByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield model_1.Student.findOne({ user: id }).select("studentId");
            return student ? student.studentId : "";
        });
    }
}
exports.StudentService = new Service();
