import { Router } from "express";
import { LessonController } from "./controller";

const router = Router();

router.post("/create", LessonController.createLesson);

router.get("/", LessonController.getAllLessons);

router.get("/:id", LessonController.getLessonById);

router.patch("/:id", LessonController.updateLesson);

router.patch(
  "/update-quizzes/:lessonId",
  LessonController.updateQuizzesInLesson
);

router.delete("/:id", LessonController.deleteLesson);

router.get("/module/:moduleId", LessonController.getLessonsByModule);

export const LessonRoutes = router;
