import { Router } from "express";
import { QuizSubmissionController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.get(
  "/result/:userId/:lessonId",
  JwtInstance.verifyToken,
  QuizSubmissionController.getSubmittedQuizResultByLessonId
);

router.get(
  "/single/:id",
  JwtInstance.verifyToken,
  QuizSubmissionController.getSingleQuizSubmission
);

router.post(
  "/submit/:userId/:lessonId",
  JwtInstance.verifyToken,
  QuizSubmissionController.submitQuiz
);

router.get(
  "/",
  JwtInstance.verifyToken,
  QuizSubmissionController.getAllQuizSubmissions
);

export const QuizSubmissionRoutes = router;
