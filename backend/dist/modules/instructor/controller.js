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
exports.InstructorController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createNewInstructor = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.InstructorService.createNewInstructor(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Instructor added successfully",
                data: null,
            });
        }));
        this.getAllInstructors = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.InstructorService.getAllInstructors();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Instructors retrieved successfully",
                data: data,
            });
        }));
        this.getMyStudents = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const instructorId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.instructorUserId;
            const data = yield service_1.InstructorService.getMyStudents(instructorId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "My Students retrieved successfully",
                data: data,
            });
        }));
    }
}
exports.InstructorController = new Controller();
