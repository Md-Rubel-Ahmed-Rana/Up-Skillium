import { Router } from "express";
import { QuizSubmissionController } from "./controller";

const router = Router();

router.get(
  "/result/:userId/:lessonId",
  QuizSubmissionController.getSubmittedQuizResultByLessonId
);

router.get("/single/:id", QuizSubmissionController.getSingleQuizSubmission);

router.post("/submit/:userId/:lessonId", QuizSubmissionController.submitQuiz);

router.get("/", QuizSubmissionController.getAllQuizSubmissions);

export const QuizSubmissionRoutes = router;
