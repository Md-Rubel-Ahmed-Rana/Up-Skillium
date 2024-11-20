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
exports.StudentProgressService = void 0;
const service_1 = require("../module/service");
const model_1 = require("./model");
class Service {
    createOrUpdateStudentProgress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const existingProgress = yield model_1.StudentProgress.findOne({
                user: data.userId,
            });
            const modules = yield service_1.ModuleService.getModulesLessonsByCourseId(data.courseId);
            const reOrganizedModules = modules.map((module) => ({
                module: module.id,
                isModuleCompleted: false,
                lessons: module.lessons.map((lessonId) => ({
                    lesson: lessonId,
                    isLessonCompleted: false,
                })),
            }));
            const firstModule = reOrganizedModules[0];
            const firstLessonId = ((_a = firstModule === null || firstModule === void 0 ? void 0 : firstModule.lessons[0]) === null || _a === void 0 ? void 0 : _a.lesson) || null;
            if (existingProgress) {
                const courseExists = (_b = existingProgress === null || existingProgress === void 0 ? void 0 : existingProgress.courses) === null || _b === void 0 ? void 0 : _b.some((course) => { var _a, _b; return ((_a = course === null || course === void 0 ? void 0 : course.course) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = data === null || data === void 0 ? void 0 : data.courseId) === null || _b === void 0 ? void 0 : _b.toString()); });
                if (!courseExists) {
                    reOrganizedModules[0].lessons[0].isLessonCompleted = true;
                    (_c = existingProgress === null || existingProgress === void 0 ? void 0 : existingProgress.courses) === null || _c === void 0 ? void 0 : _c.push({
                        course: data.courseId,
                        isCourseCompleted: false,
                        lastCompletedLesson: firstLessonId,
                        completionPercentage: 0,
                        modules: reOrganizedModules,
                    });
                    yield existingProgress.save();
                }
            }
            else {
                reOrganizedModules[0].lessons[0].isLessonCompleted = true;
                const newCourseProgress = {
                    user: data.userId,
                    courses: [
                        {
                            course: data.courseId,
                            isCourseCompleted: false,
                            lastCompletedLesson: firstLessonId,
                            completionPercentage: 0,
                            modules: reOrganizedModules,
                        },
                    ],
                };
                yield model_1.StudentProgress.create(newCourseProgress);
            }
        });
    }
    getAllCoursesProgress() {
        return __awaiter(this, void 0, void 0, function* () {
            const progresses = yield model_1.StudentProgress.find({})
                .populate({
                path: "courses.course",
                model: "Course",
                select: { title: 1, image: 1 },
            })
                .populate({
                path: "user",
                model: "User",
                select: { name: 1, email: 1, image: 1 },
            })
                .populate({
                path: "courses.lastCompletedLesson",
                model: "Lesson",
            })
                .select("-courses.modules");
            return progresses;
        });
    }
    getStudentProgress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.StudentProgress.findOne({ user: userId });
        });
    }
    getSingleCourseProgress(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const progress = yield model_1.StudentProgress.findOne({
                user: userId,
                "courses.course": courseId,
            }, {
                "courses.$": 1,
            })
                .populate({
                path: "courses.course",
                model: "Course",
                select: { title: 1 },
            })
                .populate({
                path: "courses.modules.module",
                model: "Module",
                select: { title: 1 },
            })
                .populate({
                path: "courses.modules.lessons.lesson",
                model: "Lesson",
                select: { title: 1, type: 1 },
            })
                .populate({
                path: "courses.lastCompletedLesson",
                model: "Lesson",
            });
            if (!progress) {
                return null;
            }
            return progress.courses[0];
        });
    }
    getAllCourseProgressForStudent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const progress = yield model_1.StudentProgress.findOne({
                user: userId,
            })
                .populate({
                path: "courses.course",
                model: "Course",
                select: { title: 1, image: 1 },
            })
                .populate({
                path: "courses.lastCompletedLesson",
                model: "Lesson",
            })
                .select({
                "courses.course": 1,
                "courses.isCourseCompleted": 1,
                "courses.completionPercentage": 1,
                "courses.lastCompletedLesson": 1,
            });
            if (!progress) {
                return null;
            }
            return progress.courses;
        });
    }
    completeLesson(userId, courseId, moduleId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const progress = yield model_1.StudentProgress.findOne({
                user: userId,
                "courses.course": courseId,
                "courses.modules.module": moduleId,
                "courses.modules.lessons.lesson": lessonId,
            });
            if (!progress) {
                throw new Error("Progress not found");
            }
            const course = (_a = progress === null || progress === void 0 ? void 0 : progress.courses) === null || _a === void 0 ? void 0 : _a.find((c) => c.course.equals(courseId));
            if (!course)
                return;
            const module = (_b = course === null || course === void 0 ? void 0 : course.modules) === null || _b === void 0 ? void 0 : _b.find((m) => m.module.equals(moduleId));
            if (!module)
                return;
            const lesson = (_c = module === null || module === void 0 ? void 0 : module.lessons) === null || _c === void 0 ? void 0 : _c.find((l) => l.lesson.equals(lessonId));
            if (!lesson)
                return;
            lesson.isLessonCompleted = true;
            if (module.lessons.every((l) => l.isLessonCompleted)) {
                module.isModuleCompleted = true;
            }
            course.lastCompletedLesson = lessonId;
            const progressData = yield this.getSingleCourseProgress(userId, courseId);
            course.completionPercentage = yield this.calculateCourseCompletion(progressData);
            yield progress.save();
        });
    }
    calculateCourseCompletion(progress) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let totalLessons = 0;
            let completedLessons = 0;
            (_a = progress === null || progress === void 0 ? void 0 : progress.modules) === null || _a === void 0 ? void 0 : _a.forEach((module) => {
                var _a;
                (_a = module === null || module === void 0 ? void 0 : module.lessons) === null || _a === void 0 ? void 0 : _a.forEach((lesson) => {
                    totalLessons++;
                    if (lesson === null || lesson === void 0 ? void 0 : lesson.isLessonCompleted) {
                        completedLessons++;
                    }
                });
            });
            const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
            progress.completionPercentage =
                Math.round(completionPercentage * 100) / 100;
            return progress.completionPercentage;
        });
    }
    assignmentLessonMarkAsSubmitted(userId, courseId, moduleId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.StudentProgress.updateOne({
                user: userId,
                "courses.course": courseId,
                "courses.modules.module": moduleId,
                "courses.modules.lessons.lesson": lessonId,
            }, {
                $set: {
                    "courses.$[course].modules.$[module].lessons.$[lesson].isAssignmentSubmitted": true,
                },
            }, {
                arrayFilters: [
                    { "course.course": courseId },
                    { "module.module": moduleId },
                    { "lesson.lesson": lessonId },
                ],
            });
        });
    }
    quizLessonMarkAsSubmitted(userId, courseId, moduleId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield model_1.StudentProgress.findOne({
                user: userId,
                "courses.course": courseId,
                "courses.modules.module": moduleId,
                "courses.modules.lessons.lesson": lessonId,
            });
            yield model_1.StudentProgress.updateOne({
                user: userId,
                "courses.course": courseId,
                "courses.modules.module": moduleId,
                "courses.modules.lessons.lesson": lessonId,
            }, {
                $set: {
                    "courses.$[course].modules.$[module].lessons.$[lesson].isQuizSubmitted": true,
                },
            }, {
                arrayFilters: [
                    { "course.course": courseId },
                    { "module.module": moduleId },
                    { "lesson.lesson": lessonId },
                ],
            });
        });
    }
}
exports.StudentProgressService = new Service();
