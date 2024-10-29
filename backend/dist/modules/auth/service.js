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
exports.AuthService = void 0;
const jwt_1 = require("../../lib/jwt");
const apiError_1 = __importDefault(require("../../shared/apiError"));
const bcrypt_1 = require("../../lib/bcrypt");
const service_1 = require("../user/service");
class Service {
    auth(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield service_1.UserService.findUserById(id);
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield service_1.UserService.findUserByEmailWithPassword(email);
            if (!isExist) {
                throw new apiError_1.default(404, "User not found!");
            }
            const isMatchedPassword = yield bcrypt_1.BcryptInstance.compare(password, isExist === null || isExist === void 0 ? void 0 : isExist.password);
            if (!isMatchedPassword) {
                throw new apiError_1.default(401, "Password doesn't match");
            }
            const jwtPayload = {
                id: isExist === null || isExist === void 0 ? void 0 : isExist._id,
                email: isExist === null || isExist === void 0 ? void 0 : isExist.email,
            };
            const accessToken = yield jwt_1.JwtInstance.generateAccessToken(jwtPayload);
            const refreshToken = yield jwt_1.JwtInstance.generateRefreshToken(jwtPayload);
            return { accessToken, refreshToken };
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.UserService.createUser({
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
            });
        });
    }
}
exports.AuthService = new Service();
