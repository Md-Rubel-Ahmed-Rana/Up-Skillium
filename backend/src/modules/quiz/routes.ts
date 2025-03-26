import { Router } from "express";
import { QuizController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post("/create", JwtInstance.verifyToken, QuizController.createQuiz);

router.get("/", JwtInstance.verifyToken, QuizController.getAllQuizzes);

router.get(
  "/module/:moduleId",
  JwtInstance.verifyToken,
  QuizController.getQuizzesByModuleId
);

router.get("/:id", JwtInstance.verifyToken, QuizController.getSingleQuiz);

router.patch("/:id", JwtInstance.verifyToken, QuizController.updateQuiz);

router.delete("/:id", JwtInstance.verifyToken, QuizController.deleteQuiz);

export const QuizRoutes = router;
