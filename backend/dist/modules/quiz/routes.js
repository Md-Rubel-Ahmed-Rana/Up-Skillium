"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const jwt_1 = require("../../lib/jwt");
const router = (0, express_1.Router)();
router.post("/create", jwt_1.JwtInstance.verifyToken, controller_1.QuizController.createQuiz);
router.get("/", jwt_1.JwtInstance.verifyToken, controller_1.QuizController.getAllQuizzes);
router.get("/module/:moduleId", jwt_1.JwtInstance.verifyToken, controller_1.QuizController.getQuizzesByModuleId);
router.get("/:id", jwt_1.JwtInstance.verifyToken, controller_1.QuizController.getSingleQuiz);
router.patch("/:id", jwt_1.JwtInstance.verifyToken, controller_1.QuizController.updateQuiz);
router.delete("/:id", jwt_1.JwtInstance.verifyToken, controller_1.QuizController.deleteQuiz);
exports.QuizRoutes = router;
