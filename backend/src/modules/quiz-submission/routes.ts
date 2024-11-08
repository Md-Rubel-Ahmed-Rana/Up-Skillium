import { Router } from "express";
import { QuizSubmissionController } from "./controller";

const router = Router();

router.get(
  "/result/:lessonId",
  QuizSubmissionController.getSubmittedQuizResultByLessonId
);

router.post(
  "/submit/:userId/:courseId/:moduleId/:lessonId",
  QuizSubmissionController.submitQuiz
);

export const QuizSubmissionRoutes = router;
