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
exports.UserController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.findUsers = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const searchText = req.query.searchText || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const users = yield service_1.UserService.findUsers(searchText, page, limit);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Users found successfully",
                data: users,
            });
        }));
        this.getSingleUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            const user = yield service_1.UserService.findUserById(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "User found successfully",
                data: user,
            });
        }));
        this.updateUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.UserService.updateUser(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "User updated successfully",
                data: null,
            });
        }));
        this.changePassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            yield service_1.UserService.changePassword(userId, oldPassword, newPassword);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Password has been changed successfully",
                data: null,
            });
        }));
        this.updateProfileImage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.UserService.updateProfileImage(id, req.url);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Profile picture changed successfully",
                data: null,
            });
        }));
        this.updateUserBasicInfo = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.UserService.updateUserBasicInfo(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "User basic info updated successfully",
                data: null,
            });
        }));
        this.updateUserAddress = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.UserService.updateUserAddress(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Address updated successfully",
                data: null,
            });
        }));
        this.updateEmergencyContact = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.UserService.updateEmergencyContact(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Emergency contact updated successfully",
                data: null,
            });
        }));
        this.activeOrInactiveAccount = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = req.params.id;
            const status = (_a = req.params) === null || _a === void 0 ? void 0 : _a.status;
            yield service_1.UserService.activeOrInactiveAccount(id, status);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: `User account has been ${status} successfully!`,
                data: null,
            });
        }));
    }
}
exports.UserController = new Controller();
