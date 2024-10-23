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
exports.UserService = void 0;
const model_1 = require("./model");
const bcrypt_1 = require("../../lib/bcrypt");
class Service {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield bcrypt_1.BcryptInstance.hash(user.password);
            const newUser = yield model_1.User.create(user);
            return newUser._id;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.User.findOne({ email: email });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.User.findById(id).select({ password: 0 });
            return user;
        });
    }
    findUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.User.findOne({ email: email });
        });
    }
}
exports.UserService = new Service();
