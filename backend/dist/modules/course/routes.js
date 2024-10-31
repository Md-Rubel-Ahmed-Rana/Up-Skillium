"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const multer_1 = __importDefault(require("../../config/multer"));
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
const router = (0, express_1.Router)();
router.post("/create", controller_1.CourseController.createCourse);
router.get("/", controller_1.CourseController.getCourses);
router.get("/:id", controller_1.CourseController.getSingleCourse);
router.patch("/:id", controller_1.CourseController.updateCourse);
router.delete("/:id", controller_1.CourseController.deleteCourse);
router.patch("/change-course-image/:id", multer_1.default.single("file"), fileUploaderMiddleware_1.FileUploadMiddleware.singleFile("course-thumbnail-images"), controller_1.CourseController.updateCourseImage);
exports.CourseRoutes = router;
