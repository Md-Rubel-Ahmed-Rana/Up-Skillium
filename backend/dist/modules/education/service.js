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
exports.EducationService = void 0;
const model_1 = require("./model");
class Service {
    addEducation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Education.create(data);
        });
    }
    getEducations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Education.find({}).populate("user", "name email image");
        });
    }
    getEducation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Education.findById(id).populate("user", "name email image");
        });
    }
    getEducationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Education.find({ user: userId }).populate("user", "name email image");
        });
    }
    updateEducation(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Education.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteEducation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Education.findByIdAndDelete(id);
        });
    }
}
exports.EducationService = new Service();
