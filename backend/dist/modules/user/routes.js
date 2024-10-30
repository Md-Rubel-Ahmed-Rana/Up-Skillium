"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const multer_1 = __importDefault(require("../../config/multer"));
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
const router = (0, express_1.Router)();
router.get("/", controller_1.UserController.findUsers);
router.patch("/:id", controller_1.UserController.updateUser);
router.patch("/change-password/:userId", controller_1.UserController.changePassword);
router.patch("/update-basic-info/:id", controller_1.UserController.updateUserBasicInfo);
router.patch("/change-profile-picture/:id", multer_1.default.single("file"), fileUploaderMiddleware_1.FileUploadMiddleware.singleFile("profile-picture"), controller_1.UserController.updateProfileImage);
exports.UserRoutes = router;
