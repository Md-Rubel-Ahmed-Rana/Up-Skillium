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
            if (data === null || data === void 0 ? void 0 : data.meetingLink) {
                console.log("Meet link found", data === null || data === void 0 ? void 0 : data.meetingLink);
                yield model_1.default.create(data);
            }
            else {
                console.log("Meet link not found. Creating...");
                const creator = yield service_2.UserService.findUserById(data === null || data === void 0 ? void 0 : data.creator);
                const meetData = {
                    summary: data.title,
                    description: data.description,
                    startDateTime: data.startDateTime,
                    endDateTime: data.endDateTime,
                    creator: {
                        name: creator === null || creator === void 0 ? void 0 : creator.name,
                        email: creator === null || creator === void 0 ? void 0 : creator.email,
                    },
                };
                const meetLink = yield service_1.GoogleService.createMeetLink(meetData);
                console.log("Meet link created.", meetLink);
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
    getLiveClassesByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield model_1.default.find({ instructor: instructorId });
            return classes;
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
}
exports.LiveClassService = new Service();
