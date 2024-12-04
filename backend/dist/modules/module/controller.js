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
exports.ModuleController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createNewModule = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.ModuleService.createNewModule(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Module created successfully",
                data: null,
            });
        }));
        this.getAllModules = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const searchText = req.query.searchText || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const courseId = req.query.courseId;
            const data = yield service_1.ModuleService.getAllModules(searchText, page, limit, courseId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Modules fetched successfully",
                data: data,
            });
        }));
        this.getSingleModule = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.ModuleService.getSingleModule(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Module fetched successfully",
                data: data,
            });
        }));
        this.getModuleByCourseId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const courseId = req.params.courseId;
            const data = yield service_1.ModuleService.getModuleByCourseId(courseId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Modules fetched successfully",
                data: data,
            });
        }));
        this.getFullClassByCourseId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const courseId = req.params.courseId;
            const data = yield service_1.ModuleService.getFullClassByCourseId(courseId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Classes fetched successfully",
                data: data,
            });
        }));
        this.updateModule = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.ModuleService.updateModule(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Module updated successfully",
                data: null,
            });
        }));
        this.deleteModule = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.ModuleService.deleteModule(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Module deleted successfully",
                data: null,
            });
        }));
    }
}
exports.ModuleController = new Controller();
