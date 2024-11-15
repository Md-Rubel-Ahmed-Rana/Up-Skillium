"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/create", controller_1.InstructorController.createNewInstructor);
router.get("/", controller_1.InstructorController.getAllInstructors);
exports.InstructorRoutes = router;
