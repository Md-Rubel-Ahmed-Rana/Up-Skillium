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
const service_1 = require("../role/service");
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
const generateStudentId_1 = __importDefault(require("../../utils/generateStudentId"));
const generateAdminId_1 = __importDefault(require("../../utils/generateAdminId"));
const generateTeacherId_1 = __importDefault(require("../../utils/generateTeacherId"));
class Service {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
            if (existingUser) {
                throw new apiError_1.default(409, "Email already exists. Please use a different email.");
            }
            const userRole = user === null || user === void 0 ? void 0 : user.role;
            const role = yield service_1.RoleService.getRoleByRoleName(userRole);
            user.password = yield bcrypt_1.BcryptInstance.hash(user.password);
            user.role = role === null || role === void 0 ? void 0 : role.id;
            if ((role === null || role === void 0 ? void 0 : role.name) === "student") {
                const studentId = yield this.createStudentId();
                user.userRoleId = studentId;
                user.roleName = "student";
            }
            else if ((role === null || role === void 0 ? void 0 : role.name) === "instructor") {
                const instructorId = yield this.createInstructorId();
                user.userRoleId = instructorId;
                user.roleName = "instructor";
            }
            else if ((role === null || role === void 0 ? void 0 : role.name) === "admin") {
                const adminId = yield this.createAdminId();
                user.userRoleId = adminId;
                user.roleName = "admin";
            }
            yield model_1.User.create(user);
        });
    }
    createStudentId() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastStudent = yield model_1.User.findOne({ roleName: "student" }).sort({
                createdAt: -1,
            });
            const studentId = lastStudent
                ? (0, generateStudentId_1.default)(lastStudent.userRoleId)
                : (0, generateStudentId_1.default)("US-ST-0000");
            return studentId;
        });
    }
    createAdminId() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastAdmin = yield model_1.User.findOne({ roleName: "admin" }).sort({
                createdAt: -1,
            });
            const adminId = lastAdmin
                ? (0, generateAdminId_1.default)(lastAdmin.userRoleId)
                : (0, generateAdminId_1.default)("US-AD-0000");
            return adminId;
        });
    }
    createInstructorId() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastInstructor = yield model_1.User.findOne({ roleName: "instructor" }).sort({
                createdAt: -1,
            });
            const instructorId = lastInstructor
                ? (0, generateTeacherId_1.default)(lastInstructor.userRoleId)
                : (0, generateTeacherId_1.default)("US-TE-0000");
            return instructorId;
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
                .select({ password: 0 })
                .populate("role")
                .skip(skip)
                .limit(limit);
            return users;
        });
    }
    findUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.User.findOne({ email: email });
        });
    }
    getUsersEmailByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield model_1.User.find({ _id: { $in: ids } }).select({
                email: 1,
            });
            const usersEmails = users.map((user) => {
                return { email: user === null || user === void 0 ? void 0 : user.email };
            });
            return usersEmails;
        });
    }
    updateUser(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    updateUserBasicInfo(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndUpdate(id, { $set: Object.assign({}, updatedData) });
        });
    }
    updateUserAddress(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndUpdate(id, { $set: { address: Object.assign({}, updatedData) } });
        });
    }
    updateEmergencyContact(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndUpdate(id, {
                $set: { emergencyContact: Object.assign({}, updatedData) },
            });
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
    resetPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield model_1.User.findById(userId);
            if (!isExist) {
                throw new apiError_1.default(404, "User was not found!");
            }
            else {
                const newHashedPassword = yield bcrypt_1.BcryptInstance.hash(newPassword);
                yield model_1.User.findByIdAndUpdate(userId, {
                    $set: { password: newHashedPassword },
                });
            }
        });
    }
    updateProfileImage(id, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.User.findById(id);
            if (user && (user === null || user === void 0 ? void 0 : user.image)) {
                yield fileUploaderMiddleware_1.FileUploadMiddleware.deleteSingle(user === null || user === void 0 ? void 0 : user.image);
            }
            yield model_1.User.findByIdAndUpdate(id, { $set: { image: imageUrl } });
        });
    }
    activeOrInactiveAccount(userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndUpdate(userId, { $set: { status: status } });
        });
    }
    deleteUserAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.User.findByIdAndDelete(id);
        });
    }
}
exports.UserService = new Service();
