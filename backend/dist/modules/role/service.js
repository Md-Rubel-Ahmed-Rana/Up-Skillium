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
exports.RoleService = void 0;
const model_1 = require("./model");
class Service {
    createRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Role.create(data);
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Role.find({});
        });
    }
    getRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Role.findById(id);
        });
    }
    getRoleByRoleName(roleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Role.findOne({ name: roleName });
        });
    }
    updateRole(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Role.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Role.findByIdAndDelete(id);
        });
    }
}
exports.RoleService = new Service();
