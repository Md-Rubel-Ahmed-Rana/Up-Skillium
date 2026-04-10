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
const model_1 = require("./model");
const service_1 = require("../module/service");
const mail_service_1 = require("../mail/mail.service");
class Service {
    submit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield model_1.AssignmentSubmission.create(data);
            return result;
        });
    }
    getAllSubmission() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.find({}).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "lesson",
                    model: "Lesson",
                },
            ]);
        });
    }
    getSingleSubmission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.findById(id).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "lesson",
                    model: "Lesson",
                },
            ]);
        });
    }
    getAllPendingSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.find({ status: "pending" }).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "lesson",
                    model: "Lesson",
                },
            ]);
        });
    }
    getAllReviewedSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.find({ status: "checked" }).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "lesson",
                    model: "Lesson",
                },
            ]);
        });
    }
    getAssignmentSubmissionByLessonId(userId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.AssignmentSubmission.findOne({
                user: userId,
                lesson: lessonId,
            });
        });
    }
    updateAssignmentReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const assignment = yield model_1.AssignmentSubmission.findOneAndUpdate({
                user: data.user,
                lesson: data.lesson,
            }, { $set: Object.assign({}, data) }, { new: true }).populate(["user", "lesson"]);
            // Send notification email to student
            const mailData = {
                assignmentTitle: (_a = assignment === null || assignment === void 0 ? void 0 : assignment.lesson) === null || _a === void 0 ? void 0 : _a.title,
                student: {
                    name: (_b = assignment === null || assignment === void 0 ? void 0 : assignment.user) === null || _b === void 0 ? void 0 : _b.name,
                    email: (_c = assignment === null || assignment === void 0 ? void 0 : assignment.user) === null || _c === void 0 ? void 0 : _c.email,
                },
                marks: assignment.yourMark,
                totalMarks: assignment.fullMark,
            };
            yield mail_service_1.MailService.sendAssignmentMarkedMail(mailData);
        });
    }
    updateSubmission(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.AssignmentSubmission.findByIdAndUpdate(id, {
                $set: Object.assign({}, updatedData),
            });
        });
    }
    getPendingAssignmentByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = yield service_1.ModuleService.getAllModulesByInstructor(instructorId);
            const moduleIds = modules.map((module) => module === null || module === void 0 ? void 0 : module.id);
            const assignments = yield model_1.AssignmentSubmission.find({
                "lesson.module": { $in: moduleIds },
                status: "pending",
            });
            return assignments;
        });
    }
    getCompletedAssignmentByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = yield service_1.ModuleService.getAllModulesByInstructor(instructorId);
            const moduleIds = modules.map((module) => module === null || module === void 0 ? void 0 : module.id);
            const assignments = yield model_1.AssignmentSubmission.find({
                "lesson.module": { $in: moduleIds },
                status: "checked",
            });
            return assignments;
        });
    }
    getAssignmentSubmissionAnalyticsSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const summary = yield model_1.AssignmentSubmission.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSubmissions: { $sum: 1 },
                        totalChecked: {
                            $sum: { $cond: [{ $eq: ["$status", "checked"] }, 1, 0] },
                        },
                        totalPending: {
                            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
                        },
                        totalLate: {
                            $sum: { $cond: ["$isLate", 1, 0] },
                        },
                        totalOnTime: {
                            $sum: { $cond: ["$isLate", 0, 1] },
                        },
                        averageMark: { $avg: "$yourMark" },
                        averageFullMark: { $avg: "$fullMark" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalSubmissions: 1,
                        totalChecked: 1,
                        totalPending: 1,
                        totalLate: 1,
                        totalOnTime: 1,
                        averageMark: { $round: ["$averageMark", 2] },
                        averageFullMark: { $round: ["$averageFullMark", 2] },
                    },
                },
            ]);
            return (summary[0] || {
                totalSubmissions: 0,
                totalChecked: 0,
                totalPending: 0,
                totalLate: 0,
                totalOnTime: 0,
                averageMark: 0,
                averageFullMark: 0,
            });
        });
    }
}
exports.AssignmentSubmissionService = new Service();
