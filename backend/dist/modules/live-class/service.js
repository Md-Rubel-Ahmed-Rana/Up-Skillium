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
const mail_service_1 = require("../mail/mail.service");
class Service {
    createLiveClass(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const mailData = {
                title: data === null || data === void 0 ? void 0 : data.title,
                startDateTime: data === null || data === void 0 ? void 0 : data.startDateTime,
                duration: data === null || data === void 0 ? void 0 : data.duration,
                topics: data === null || data === void 0 ? void 0 : data.topics,
            };
            let newLiveClass;
            if ((data === null || data === void 0 ? void 0 : data.meetingLink) && (data === null || data === void 0 ? void 0 : data.meetingLink) !== "") {
                newLiveClass = yield model_1.default.create(data);
                mailData.meetingLink = data === null || data === void 0 ? void 0 : data.meetingLink;
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
                newLiveClass = yield model_1.default.create(Object.assign(Object.assign({}, data), { meetingLink: meetLink }));
                mailData.meetingLink = meetLink;
            }
            const createdLiveClass = yield model_1.default.findById(newLiveClass._id)
                .populate("students", "name email")
                .populate("instructor", "name email")
                .populate("course", "title image category");
            mailData.instructor = {
                name: (_a = createdLiveClass === null || createdLiveClass === void 0 ? void 0 : createdLiveClass.instructor) === null || _a === void 0 ? void 0 : _a.name,
                email: (_b = createdLiveClass === null || createdLiveClass === void 0 ? void 0 : createdLiveClass.instructor) === null || _b === void 0 ? void 0 : _b.email,
            };
            mailData.courseName = (_c = createdLiveClass === null || createdLiveClass === void 0 ? void 0 : createdLiveClass.course) === null || _c === void 0 ? void 0 : _c.title;
            mailData.students = createdLiveClass === null || createdLiveClass === void 0 ? void 0 : createdLiveClass.students;
            // Send email to students
            yield mail_service_1.MailService.sendLiveClassMail(mailData);
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
                .populate("course", "title image category")
                .populate("students", "name email image");
            return classes;
        });
    }
    getSingleClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleClass = yield model_1.default.findById(id)
                .populate("instructor", "name email image")
                .populate("creator", "name email image")
                .populate("course", "title image category")
                .populate("students", "name email image");
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
                .populate("instructor", "name email image")
                .populate("creator", "name email image")
                .populate("course", "title image category")
                .populate("students", "name email image");
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
                .populate("instructor", "name email image")
                .populate("creator", "name email image")
                .populate("course", "title image category")
                .populate("students", "name email image");
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
