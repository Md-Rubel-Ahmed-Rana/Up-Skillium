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
const jwt_1 = require("../../lib/jwt");
const router = (0, express_1.Router)();
router.post("/create", jwt_1.JwtInstance.verifyToken, multer_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "introductoryVideo" },
]), fileUploaderMiddleware_1.FileUploadMiddleware.uploadCourseImageAndIntroVideo(), controller_1.CourseController.createCourse);
router.get("/", controller_1.CourseController.getCourses);
router.get("/related-courses", controller_1.CourseController.getMatchedRelatedCourses);
router.get("/published/courses", controller_1.CourseController.getOnlyPublishedCourses);
router.get("/category/courses/:category", controller_1.CourseController.getCoursesByCategory);
router.get("/:id", controller_1.CourseController.getSingleCourse);
router.get("/instructor/:instructorId", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.getCoursesByInstructor);
router.get("/my-students/:instructorId", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.getMyStudentsByInstructor);
router.get("/students/:courseId", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.getStudentsFromCourse);
router.delete("/:id", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.deleteCourse);
router.patch("/update-basic-info/:id", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.updateCourseBasicInfo);
router.patch("/update-price/:id", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.updateCoursePrice);
router.patch("/update-tags-techs/:id", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.updateCourseTagsTechnologies);
router.patch("/update-instructor/:courseId/:instructorId", jwt_1.JwtInstance.verifyToken, controller_1.CourseController.updateCourseInstructor);
router.patch("/change-course-image/:id", jwt_1.JwtInstance.verifyToken, multer_1.default.single("file"), fileUploaderMiddleware_1.FileUploadMiddleware.singleFile("course-thumbnail-images"), controller_1.CourseController.updateCourseImage);
router.patch("/change-course-introductory-video/:id", jwt_1.JwtInstance.verifyToken, multer_1.default.single("file"), fileUploaderMiddleware_1.FileUploadMiddleware.singleFile("course-introductory-videos"), controller_1.CourseController.updateCourseIntroductoryVideo);
exports.CourseRoutes = router;
