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
exports.AssignmentController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.getAllAssignments = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.AssignmentService.getAllAssignments();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignments retrieved successfully",
                data: data,
            });
        }));
        this.getSingleAssignment = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.AssignmentService.getSingleAssignment(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment retrieved successfully",
                data: data,
            });
        }));
        this.updateAssignment = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.AssignmentService.updateAssignment(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment updated successfully",
                data: null,
            });
        }));
        this.deleteAssignment = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.AssignmentService.deleteAssignment(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Assignment deleted successfully",
                data: null,
            });
        }));
    }
}
exports.AssignmentController = new Controller();
