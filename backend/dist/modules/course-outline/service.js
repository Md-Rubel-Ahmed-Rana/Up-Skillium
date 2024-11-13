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
            const outlines = yield model_1.CourseOutline.find({}).populate([
                {
                    path: "course",
                    model: "Course",
                    select: { title: 1, image: 1 },
                },
            ]);
            return outlines.map((outline) => {
                outline.modules = outline.modules.sort((a, b) => a.serial - b.serial);
                return outline;
            });
        });
    }
    getOutline(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.CourseOutline.findById(id).populate([
                {
                    path: "course",
                    model: "Course",
                    select: { title: 1, image: 1 },
                },
            ]);
            if (!data) {
                throw new apiError_1.default(404, "Course outline was not found!");
            }
            data.modules = data.modules.sort((a, b) => a.serial - b.serial);
            return data;
        });
    }
    getOutlineByCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.CourseOutline.findOne({ course: courseId }).populate([
                {
                    path: "course",
                    model: "Course",
                    select: { title: 1, image: 1 },
                },
            ]);
            if (!data) {
                throw new apiError_1.default(404, "Course outline was not found!");
            }
            data.modules = data.modules.sort((a, b) => a.serial - b.serial);
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
    updateModuleSerialNumberFromDragDrop(courseId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const outline = yield model_1.CourseOutline.findOne({ course: courseId });
            if (!outline) {
                throw new Error("Course outline not found");
            }
            const modules = outline.modules;
            const updatedModules = modules.map((module) => {
                var _a, _b;
                if ((module === null || module === void 0 ? void 0 : module.id) === ((_a = data === null || data === void 0 ? void 0 : data.sourceObject) === null || _a === void 0 ? void 0 : _a.moduleId)) {
                    return {
                        id: module === null || module === void 0 ? void 0 : module.id,
                        name: module === null || module === void 0 ? void 0 : module.name,
                        serial: data.destinationObject.serialNumber,
                    };
                }
                if ((module === null || module === void 0 ? void 0 : module.id) === ((_b = data === null || data === void 0 ? void 0 : data.destinationObject) === null || _b === void 0 ? void 0 : _b.moduleId)) {
                    return {
                        id: module === null || module === void 0 ? void 0 : module.id,
                        name: module === null || module === void 0 ? void 0 : module.name,
                        serial: data.sourceObject.serialNumber,
                    };
                }
                return module;
            });
            outline.modules = updatedModules;
            yield outline.save();
        });
    }
    deleteModule(courseId, moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.CourseOutline.updateOne({ course: courseId }, { $pull: { modules: { _id: moduleId } } });
        });
    }
    updateModuleName(courseId, moduleId, updatedName) {
        return __awaiter(this, void 0, void 0, function* () {
            const outline = yield model_1.CourseOutline.findOne({
                course: courseId,
            });
            if (!outline) {
                throw new Error("Course outline or module not found");
            }
            const module = outline === null || outline === void 0 ? void 0 : outline.modules.find((mod) => (mod === null || mod === void 0 ? void 0 : mod.id) === moduleId);
            if (!module) {
                throw new Error("Module not found");
            }
            module.name = updatedName;
            yield outline.save();
        });
    }
}
exports.CourseOutlineService = new Service();
