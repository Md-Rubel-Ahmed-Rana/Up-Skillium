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
exports.UserService = void 0;
const model_1 = require("./model");
const bcrypt_1 = require("../../lib/bcrypt");
const apiError_1 = __importDefault(require("../../shared/apiError"));
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
            const user = yield model_1.User.findById(id)
                .select({ password: 0 })
                .populate("role");
            return user;
        });
    }
    findUsers() {
        return __awaiter(this, arguments, void 0, function* (search = "", page = 1, limit = 5) {
            const searchQuery = search
                ? {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                    ],
                }
                : {};
            const skip = (page - 1) * limit;
            const users = yield model_1.User.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .lean()
                .exec();
            const total = yield model_1.User.countDocuments();
            return { users, total };
        });
    }
    findUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.User.findOne({ email: email });
        });
    }
    updateUser(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    changePassword(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield model_1.User.findById(userId);
            if (!isExist) {
                throw new apiError_1.default(404, "User was not found!");
            }
            else {
                const isOldPasswordMatched = yield bcrypt_1.BcryptInstance.compare(oldPassword, isExist.password);
                if (!isOldPasswordMatched) {
                    throw new apiError_1.default(400, "Incorrect password. Please enter your correct password");
                }
                else {
                    const newHashedPassword = yield bcrypt_1.BcryptInstance.hash(newPassword);
                    yield model_1.User.findByIdAndUpdate(userId, {
                        $set: { password: newHashedPassword },
                    });
                }
            }
        });
    }
}
exports.UserService = new Service();