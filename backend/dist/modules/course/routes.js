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
router.post("/create", multer_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "introductoryVideo" },
]), fileUploaderMiddleware_1.FileUploadMiddleware.uploadCourseImageAndIntroVideo(), controller_1.CourseController.createCourse);
router.get("/", controller_1.CourseController.getCourses);
router.get("/related-courses", controller_1.CourseController.getMatchedRelatedCourses);
router.get("/published/courses", controller_1.CourseController.getOnlyPublishedCourses);
router.get("/:id", controller_1.CourseController.getSingleCourse);
router.get("/instructor/:instructorId", controller_1.CourseController.getCoursesByInstructor);
router.delete("/:id", controller_1.CourseController.deleteCourse);
router.patch("/update-basic-info/:id", controller_1.CourseController.updateCourseBasicInfo);
router.patch("/update-price/:id", controller_1.CourseController.updateCoursePrice);
router.patch("/update-tags-techs/:id", controller_1.CourseController.updateCourseTagsTechnologies);
router.patch("/update-instructor/:courseId/:instructorId", controller_1.CourseController.updateCourseInstructor);
router.patch("/change-course-image/:id", multer_1.default.single("file"), fileUploaderMiddleware_1.FileUploadMiddleware.singleFile("course-thumbnail-images"), controller_1.CourseController.updateCourseImage);
router.patch("/change-course-introductory-video/:id", multer_1.default.single("file"), fileUploaderMiddleware_1.FileUploadMiddleware.singleFile("course-introductory-videos"), controller_1.CourseController.updateCourseIntroductoryVideo);
exports.CourseRoutes = router;
