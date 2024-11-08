"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSubmissionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/result/:lessonId", controller_1.QuizSubmissionController.getSubmittedQuizResultByLessonId);
router.post("/submit/:userId/:courseId/:moduleId/:lessonId", controller_1.QuizSubmissionController.submitQuiz);
exports.QuizSubmissionRoutes = router;
