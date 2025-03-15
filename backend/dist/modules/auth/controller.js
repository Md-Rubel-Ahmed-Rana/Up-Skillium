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
exports.AuthController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
const cookies_1 = require("../../shared/cookies");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.auth = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req === null || req === void 0 ? void 0 : req.id;
            const result = yield service_1.AuthService.auth(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "User fetched  successfully",
                data: result,
            });
        }));
        this.register = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.AuthService.register(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "User registered successfully",
                data: null,
            });
        }));
        this.login = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = yield service_1.AuthService.login(email, password);
            cookies_1.cookieManager.setTokens(res, accessToken, refreshToken);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Login successful",
                data: null,
            });
        }));
        this.logout = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            cookies_1.cookieManager.clearTokens(res);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Logout successful",
                data: null,
            });
        }));
        this.forgetPassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            yield service_1.AuthService.forgetPassword(email);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "A password reset link has been sent to your email. Please check your inbox or spam folder and follow the instructions to reset your password.",
                data: null,
            });
        }));
        this.verifyResetPasswordToken = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Proceed to reset your password",
                data: null,
            });
        }));
    }
}
exports.AuthController = new Controller();
