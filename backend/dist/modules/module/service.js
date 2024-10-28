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
exports.ModuleService = void 0;
const model_1 = require("./model");
class Service {
    createNewModule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Module.create(data);
        });
    }
    getAllModules() {
        return __awaiter(this, arguments, void 0, function* (search = "", page = 1, limit = 10, courseId) {
            const searchQuery = Object.assign(Object.assign({}, (search && { title: { $regex: search, $options: "i" } })), (courseId && { courseId }));
            const skip = (page - 1) * limit;
            const modules = yield model_1.Module.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .exec();
            return modules;
        });
    }
    getSingleModule(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Module.findById(moduleId);
        });
    }
    getModuleByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Module.findOne({ courseId: courseId });
        });
    }
    updateModule(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Module.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteModule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Module.findByIdAndDelete(id);
        });
    }
}
exports.ModuleService = new Service();
