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
exports.AdminService = void 0;
const model_1 = require("./model");
const generateAdminId_1 = __importDefault(require("./generateAdminId"));
class Service {
    createNewAdmin(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastAdmin = yield model_1.Admin.findOne({}).sort({ createdAt: -1 });
            const adminId = lastAdmin
                ? (0, generateAdminId_1.default)(lastAdmin.adminId)
                : (0, generateAdminId_1.default)("US-AD-0000");
            yield model_1.Admin.create({ user: userId, adminId });
        });
    }
}
exports.AdminService = new Service();
