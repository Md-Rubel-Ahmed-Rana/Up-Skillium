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
exports.AssignmentSubmissionService = void 0;
const service_1 = require("../student-progress/service");
const model_1 = require("./model");
class Service {
    submit(userId, courseId, moduleId, lessonId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield model_1.AssignmentSubmission.create(data);
            yield service_1.StudentProgressService.assignmentLessonMarkAsSubmitted(userId, courseId, moduleId, lessonId);
            return result;
        });
    }
    getAllSubmission() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.find({});
        });
    }
    getAllPendingSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.find({ status: "pending" });
        });
    }
    getAllReviewedSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.find({ status: "checked" });
        });
    }
    getAssignmentSubmissionByLessonId(userId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.findOne({
                userId: userId,
                lessonId: lessonId,
            });
        });
    }
    updateAssignmentReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.AssignmentSubmission.findOneAndUpdate({
                userId: data.userId,
                lessonId: data.lessonId,
            }, { $set: Object.assign({}, data) });
        });
    }
    updateSubmission(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.AssignmentSubmission.findByIdAndUpdate(id, {
                $set: Object.assign({}, updatedData),
            });
        });
    }
}
exports.AssignmentSubmissionService = new Service();
