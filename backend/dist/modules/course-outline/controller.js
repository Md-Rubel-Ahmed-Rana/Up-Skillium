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
exports.CourseOutlineController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createOutline = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.CourseOutlineService.createOutline(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Course outline created successful",
                data: null,
            });
        }));
        this.getOutlines = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.CourseOutlineService.getOutlines();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course outlines fetched successful",
                data: data,
            });
        }));
        this.getOutline = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.CourseOutlineService.getOutline(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course outline fetched successful",
                data: data,
            });
        }));
        this.getOutlineByCourse = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const courseId = req.params.courseId;
            const data = yield service_1.CourseOutlineService.getOutlineByCourse(courseId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course outline fetched successful",
                data: data,
            });
        }));
        this.updateOutline = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseOutlineService.updateOutline(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course outline fetched successful",
                data: null,
            });
        }));
        this.deleteOutline = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CourseOutlineService.deleteOutline(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course outline fetched successful",
                data: null,
            });
        }));
    }
}
exports.CourseOutlineController = new Controller();
