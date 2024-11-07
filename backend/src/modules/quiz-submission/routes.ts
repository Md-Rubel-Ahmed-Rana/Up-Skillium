import { Router } from "express";
import { QuizSubmissionController } from "./controller";

const router = Router();

router.get(
  "/result/:lessonId",
  QuizSubmissionController.getSubmittedQuizResultByLessonId
);

export const QuizSubmissionRoutes = router;
