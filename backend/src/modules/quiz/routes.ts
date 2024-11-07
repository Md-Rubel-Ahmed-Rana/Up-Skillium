import { Router } from "express";
import { QuizController } from "./controller";

const router = Router();

router.post("/create", QuizController.createQuiz);

router.get("/", QuizController.getAllQuizzes);

router.get("/module/:moduleId", QuizController.getQuizzesByModuleId);

router.get("/:id", QuizController.getSingleQuiz);

router.patch("/:id", QuizController.updateQuiz);

router.delete("/:id", QuizController.deleteQuiz);

router.post("/submit-quiz", QuizController.checkAndCalculateQuizAnswers);

export const QuizRoutes = router;
