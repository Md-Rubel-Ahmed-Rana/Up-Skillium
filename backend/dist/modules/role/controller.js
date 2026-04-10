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
exports.RoleController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createRole = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.RoleService.createRole(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Role created successfully",
                data: null,
            });
        }));
        this.getAllRoles = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.RoleService.getAllRoles();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Roles fetched successfully",
                data: data,
            });
        }));
        this.getRoleById = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.RoleService.getRoleById(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Role fetched successfully",
                data: data,
            });
        }));
        this.getRoleByRoleName = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const role = req.params.role;
            const data = yield service_1.RoleService.getRoleByRoleName(role);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Role fetched successfully",
                data: data,
            });
        }));
        this.updateRole = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.RoleService.updateRole(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Role updated successfully",
                data: null,
            });
        }));
        this.deleteRole = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.RoleService.deleteRole(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Role deleted successfully",
                data: null,
            });
        }));
    }
}
exports.RoleController = new Controller();
