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
exports.LiveClassService = void 0;
const model_1 = __importDefault(require("./model"));
const service_1 = require("../google/service");
const service_2 = require("../user/service");
class Service {
    createLiveClass(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((data === null || data === void 0 ? void 0 : data.meetingLink) && (data === null || data === void 0 ? void 0 : data.meetingLink) !== "") {
                yield model_1.default.create(data);
            }
            else {
                const attendees = yield service_2.UserService.getUsersEmailByIds(data === null || data === void 0 ? void 0 : data.students);
                const meetData = {
                    summary: data === null || data === void 0 ? void 0 : data.title,
                    description: data === null || data === void 0 ? void 0 : data.description,
                    startDateTime: data === null || data === void 0 ? void 0 : data.startDateTime,
                    endDateTime: data === null || data === void 0 ? void 0 : data.endDateTime,
                    attendees: attendees,
                };
                const meetLink = yield service_1.GoogleService.createMeetLink(meetData);
                yield model_1.default.create(Object.assign(Object.assign({}, data), { meetingLink: meetLink }));
            }
        });
    }
    getAllLiveClasses(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (filters.title) {
                query.title = { $regex: filters.title, $options: "i" };
            }
            if (filters.instructor) {
                query.instructor = filters.instructor;
            }
            if (filters.instructor) {
                query.creator = filters.creator;
            }
            if (filters.course) {
                query.course = filters.course;
            }
            if (filters.status) {
                query.status = filters.status;
            }
            if (filters.startDate || filters.endDate) {
                query.scheduledDate = {};
                if (filters.startDate) {
                    query.scheduledDate.$gte = new Date(filters.startDate);
                }
                if (filters.endDate) {
                    query.scheduledDate.$lte = new Date(filters.endDate);
                }
            }
            if (filters.keywords) {
                query.$or = [
                    { title: { $regex: filters.keywords, $options: "i" } },
                    { description: { $regex: filters.keywords, $options: "i" } },
                ];
            }
            const classes = yield model_1.default.find(query)
                .sort({ createdAt: -1 })
                .populate("instructor", "name email image")
                .populate("creator", "name email image")
                .populate("course", "title image category");
            return classes;
        });
    }
    getSingleClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleClass = yield model_1.default.findById(id)
                .populate("instructor", "name email image")
                .populate("creator", "name email image")
                .populate("course", "title image category");
            return singleClass;
        });
    }
    getUpcomingLiveClassesByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield model_1.default.find({
                instructor: instructorId,
                status: "upcoming",
            })
                .sort({ createdAt: -1 })
                .populate([
                {
                    path: "course",
                    model: "Course",
                    select: "title image",
                },
                {
                    path: "instructor",
                    model: "User",
                    select: "name email image",
                },
                {
                    path: "creator",
                    model: "User",
                    select: "name email image",
                },
                {
                    path: "students",
                    model: "User",
                    select: "name email image",
                },
            ]);
            return classes;
        });
    }
    getCompletedLiveClassesByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield model_1.default.find({
                instructor: instructorId,
                status: "completed",
            })
                .sort({ createdAt: -1 })
                .populate([
                {
                    path: "course",
                    model: "Course",
                    select: "title image",
                },
                {
                    path: "instructor",
                    model: "User",
                    select: "name email image",
                },
                {
                    path: "creator",
                    model: "User",
                    select: "name email image",
                },
                {
                    path: "students",
                    model: "User",
                    select: "name email image",
                },
            ]);
            return classes;
        });
    }
    getLiveClassesByStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.default.find({ students: studentId })
                .sort({ createdAt: -1 })
                .populate([
                {
                    path: "course",
                    model: "Course",
                    select: "name description instructor",
                },
                {
                    path: "instructor",
                    model: "User",
                    select: "name email",
                },
            ]);
        });
    }
    updateClass(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.default.findByIdAndDelete(id);
        });
    }
    updateStudentsAttendees(liveClassId, studentsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.default.findByIdAndUpdate(liveClassId, {
                $set: { students: studentsIds },
            });
        });
    }
}
exports.LiveClassService = new Service();
