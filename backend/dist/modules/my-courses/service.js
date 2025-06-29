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
exports.MyCourseService = void 0;
const model_1 = require("./model");
const service_1 = require("../module/service");
class Service {
    addNewCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield model_1.MyCourse.findOne({
                user: data.user,
                course: data.course,
            });
            if (isExist) {
                console.log(`[MyCourse] Skipped: Already exists for user ${data.user} course ${data.course}`);
                return; // 👈 do not throw if wrapped in try/catch outside
            }
            const lastLesson = yield service_1.ModuleService.getFirstLessonOfFirstModuleByCourse(data.course);
            if (!lastLesson) {
                console.warn(`[MyCourse] Skipped: No lessons found for course ${data.course}`);
                return; // 👈 safely skip if course has no lesson
            }
            yield model_1.MyCourse.create(Object.assign(Object.assign({}, data), { completedLessons: (lastLesson === null || lastLesson === void 0 ? void 0 : lastLesson._id) || [], completionPercentage: 0 }));
            yield this.calculateCourseCompletion(data.user, data.course, lastLesson === null || lastLesson === void 0 ? void 0 : lastLesson._id);
        });
    }
    getMyCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.MyCourse.find({ user: userId }).populate([
                "user",
                "course",
                "lastCompletedLesson",
                "nextLesson",
            ]);
        });
    }
    getMySingleCourse(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.MyCourse.findOne({ user: userId, course: courseId }).populate([
                "user",
                "course",
                "lastCompletedLesson",
                "nextLesson",
            ]);
        });
    }
    completeLesson(userId, courseId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.calculateCourseCompletion(userId, courseId, lessonId);
        });
    }
    getStudentCourseProgressAnalyticsSummary() {
        return __awaiter(this, arguments, void 0, function* (filters = {}) {
            var _a, _b, _c;
            const summary = yield model_1.MyCourse.aggregate([
                {
                    $match: Object.assign(Object.assign({}, filters), { completionPercentage: { $ne: null } }),
                },
                {
                    $facet: {
                        overallStats: [
                            {
                                $group: {
                                    _id: null,
                                    totalEnrolled: { $sum: 1 },
                                    totalCompleted: {
                                        $sum: { $cond: ["$isCourseCompleted", 1, 0] },
                                    },
                                    totalInProgress: {
                                        $sum: { $cond: ["$isCourseCompleted", 0, 1] },
                                    },
                                    averageCompletionPercentage: { $avg: "$completionPercentage" },
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    totalEnrolled: 1,
                                    totalCompleted: 1,
                                    totalInProgress: 1,
                                    averageCompletionPercentage: {
                                        $round: ["$averageCompletionPercentage", 2],
                                    },
                                },
                            },
                        ],
                        // Optional: For expansion
                        perCourseStats: [
                            {
                                $group: {
                                    _id: "$course",
                                    enrolled: { $sum: 1 },
                                    completed: {
                                        $sum: { $cond: ["$isCourseCompleted", 1, 0] },
                                    },
                                    avgCompletion: { $avg: "$completionPercentage" },
                                },
                            },
                            {
                                $project: {
                                    courseId: "$_id",
                                    _id: 0,
                                    enrolled: 1,
                                    completed: 1,
                                    avgCompletion: { $round: ["$avgCompletion", 2] },
                                },
                            },
                        ],
                    },
                },
            ]);
            const overallStats = ((_b = (_a = summary[0]) === null || _a === void 0 ? void 0 : _a.overallStats) === null || _b === void 0 ? void 0 : _b[0]) || {
                totalEnrolled: 0,
                totalCompleted: 0,
                totalInProgress: 0,
                averageCompletionPercentage: 0,
            };
            const perCourseStats = ((_c = summary[0]) === null || _c === void 0 ? void 0 : _c.perCourseStats) || [];
            return Object.assign(Object.assign({}, overallStats), { perCourseStats });
        });
    }
    calculateCourseCompletion(userId, courseId, lastCompletedLessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalLessons = 0;
            let completedLessonsCount = 0;
            const modules = yield service_1.ModuleService.getModulesLessonsByCourseId(courseId);
            const lessons = modules.flatMap((module) => module.lessons);
            totalLessons = lessons.length;
            const myCourse = yield model_1.MyCourse.findOne({
                user: userId,
                course: courseId,
            });
            let completedLessonIds = (myCourse === null || myCourse === void 0 ? void 0 : myCourse.completedLessons.map((id) => id.toString())) ||
                [];
            if (!completedLessonIds.includes(lastCompletedLessonId.toString())) {
                yield model_1.MyCourse.findByIdAndUpdate(myCourse._id, {
                    $push: { completedLessons: lastCompletedLessonId },
                });
                completedLessonIds.push(lastCompletedLessonId.toString());
            }
            completedLessonsCount = completedLessonIds.length;
            const completionPercentage = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;
            const finalCount = Math.round(completionPercentage * 100) / 100;
            const lastCompletedIndex = lessons.findIndex((lesson) => lesson._id.toString() === lastCompletedLessonId.toString());
            const nextLesson = lastCompletedIndex !== -1 && lastCompletedIndex + 1 < lessons.length
                ? lessons[lastCompletedIndex + 1]._id
                : null;
            yield model_1.MyCourse.findByIdAndUpdate(myCourse._id, {
                completionPercentage: finalCount,
                lastCompletedLesson: lastCompletedLessonId,
                nextLesson: nextLesson,
            });
        });
    }
}
exports.MyCourseService = new Service();
