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
exports.EducationController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.addEducation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.EducationService.addEducation(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Education added successfully",
                data: null,
            });
        }));
        this.getEducations = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.EducationService.getEducations();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Educations fetched successfully",
                data: data,
            });
        }));
        this.getEducation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.EducationService.getEducation(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Education fetched successfully",
                data: data,
            });
        }));
        this.getEducationsByUserId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const data = yield service_1.EducationService.getEducationsByUserId(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Educations fetched successfully",
                data: data,
            });
        }));
        this.updateEducation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.EducationService.updateEducation(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Education updated successfully",
                data: null,
            });
        }));
        this.deleteEducation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.EducationService.deleteEducation(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Education deleted successfully",
                data: null,
            });
        }));
    }
}
exports.EducationController = new Controller();
