"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCourseRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/:userId", controller_1.MyCourseController.getMyCourses);
router.get("/single/:userId/:courseId", controller_1.MyCourseController.getMySingleCourse);
router.post("/compete-lesson/:userId/:courseId/:lessonId", controller_1.MyCourseController.completeLesson);
exports.MyCourseRoutes = router;
