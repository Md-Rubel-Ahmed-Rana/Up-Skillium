"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseOutlineRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const jwt_1 = require("../../lib/jwt");
const router = (0, express_1.Router)();
router.post("/create", jwt_1.JwtInstance.verifyToken, controller_1.CourseOutlineController.createOutline);
router.get("/", controller_1.CourseOutlineController.getOutlines);
router.get("/:id", controller_1.CourseOutlineController.getOutline);
router.get("/by-course/:courseId", controller_1.CourseOutlineController.getOutlineByCourse);
router.patch("/update-module-serial/:courseId", jwt_1.JwtInstance.verifyToken, controller_1.CourseOutlineController.updateModuleSerialNumberFromDragDrop);
router.patch("/update-module-name/:courseId/:moduleId", jwt_1.JwtInstance.verifyToken, controller_1.CourseOutlineController.updateModuleName);
router.delete("/delete-module/:courseId/:moduleId", jwt_1.JwtInstance.verifyToken, controller_1.CourseOutlineController.deleteModule);
router.patch("/:id", jwt_1.JwtInstance.verifyToken, controller_1.CourseOutlineController.updateOutlineModules);
router.delete("/:id", controller_1.CourseOutlineController.deleteOutline);
router.get("/by-instructor/outlines/:instructorId", jwt_1.JwtInstance.verifyToken, controller_1.CourseOutlineController.getOutlinesByInstructor);
exports.CourseOutlineRoutes = router;
