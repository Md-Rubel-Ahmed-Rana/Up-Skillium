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
exports.StudentService = void 0;
const model_1 = require("./model");
class Service {
    createNewStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastStudent = yield model_1.Student.findOne({}).sort({ createdAt: -1 });
            const studentId = lastStudent
                ? generateStudentId(lastStudent.studentId)
                : generateStudentId("US-ST-0000");
            data.studentId = studentId;
            yield model_1.Student.create(data);
        });
    }
}
exports.StudentService = new Service();
