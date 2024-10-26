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
exports.CourseOutlineService = void 0;
const apiError_1 = __importDefault(require("../../shared/apiError"));
const model_1 = require("./model");
class Service {
    createOutline(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.CourseOutline.create(data);
        });
    }
    getOutlines() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.CourseOutline.find({});
        });
    }
    getOutline(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.CourseOutline.findById(id);
            if (!data) {
                throw new apiError_1.default(404, "Course outline was not found!");
            }
            return data;
        });
    }
    getOutlineByCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.CourseOutline.findOne({ courseId: courseId });
            if (!data) {
                throw new apiError_1.default(404, "Course outline was not found!");
            }
            return data;
        });
    }
    updateOutline(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.CourseOutline.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteOutline(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.CourseOutline.findByIdAndDelete(id);
        });
    }
}
exports.CourseOutlineService = new Service();
