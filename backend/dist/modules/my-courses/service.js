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
exports.MyCourseService = void 0;
const model_1 = require("./model");
const service_1 = require("../module/service");
const apiError_1 = __importDefault(require("../../shared/apiError"));
class Service {
    addNewCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield model_1.MyCourse.findOne({
                user: data.user,
                course: data.course,
            });
            if (isExist) {
                throw new apiError_1.default(400, "You already have enrolled to this course!");
            }
            const lastLesson = yield service_1.ModuleService.getFirstLessonOfFirstModuleByCourse(data.course);
            yield model_1.MyCourse.create(Object.assign(Object.assign({}, data), { completedLessons: lastLesson === null || lastLesson === void 0 ? void 0 : lastLesson._id, completionPercentage: 0 }));
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
