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
exports.LiveClassController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createLiveClass = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.LiveClassService.createLiveClass(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Live class created successfully!",
                data: null,
            });
        }));
        this.getAllLiveClasses = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const filters = {
                title: req.query.title,
                instructor: req.query.instructor,
                creator: req.query.creator,
                course: req.query.course,
                status: req.query.status,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                keywords: req.query.keywords,
            };
            const classes = yield service_1.LiveClassService.getAllLiveClasses(filters);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Live classes retrieved successfully!",
                data: classes,
            });
        }));
        this.getLiveClassesByInstructor = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const instructorId = req.params.instructor;
            const classes = yield service_1.LiveClassService.getLiveClassesByInstructor(instructorId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Live classes retrieved successfully!",
                data: classes,
            });
        }));
        this.getSingleClass = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.LiveClassService.getSingleClass(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Live class retrieved successfully!",
                data: data,
            });
        }));
        this.updateClass = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.LiveClassService.updateClass(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Live class updated successfully!",
                data: null,
            });
        }));
        this.deleteClass = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.LiveClassService.deleteClass(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Live class deleted successfully!",
                data: null,
            });
        }));
    }
}
exports.LiveClassController = new Controller();
