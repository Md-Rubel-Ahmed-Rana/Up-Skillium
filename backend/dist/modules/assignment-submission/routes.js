"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentSubmissionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/submit/:userId/:courseId/:moduleId/:lessonId", controller_1.AssignmentSubmissionController.submit);
exports.AssignmentSubmissionRoutes = router;
