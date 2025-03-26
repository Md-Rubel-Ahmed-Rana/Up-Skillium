"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const jwt_1 = require("../../lib/jwt");
const router = (0, express_1.Router)();
router.post("/add", jwt_1.JwtInstance.verifyToken, controller_1.EducationController.addEducation);
router.get("/", jwt_1.JwtInstance.verifyToken, controller_1.EducationController.getEducations);
router.get("/:id", jwt_1.JwtInstance.verifyToken, controller_1.EducationController.getEducation);
router.get("/by-user/:userId", jwt_1.JwtInstance.verifyToken, controller_1.EducationController.getEducationsByUserId);
router.patch("/:id", jwt_1.JwtInstance.verifyToken, controller_1.EducationController.updateEducation);
router.delete("/:id", jwt_1.JwtInstance.verifyToken, controller_1.EducationController.deleteEducation);
exports.EducationRoutes = router;
