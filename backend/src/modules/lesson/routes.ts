import { Router } from "express";
import { LessonController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

const router = Router();

router.post("/create", LessonController.createLesson);

router.post("/create/type/instruction", LessonController.createLesson);

router.post("/create/type/assignment", LessonController.createLesson);

router.post("/create/type/quiz", LessonController.createQuizLesson);

router.post(
  "/create/type/video",
  upload.single("video"),
  FileUploadMiddleware.uploadLessonVideo,
  LessonController.createVideoLesson
);

router.get("/", LessonController.getAllLessons);

router.get("/:id", LessonController.getLessonById);

router.get(
  "/quiz-correct-answer/:lessonId",
  LessonController.getLessonByIdWithQuizCorrectAnswer
);

router.patch("/:id", LessonController.updateLesson);

router.patch(
  "/update-quizzes/:lessonId",
  LessonController.updateQuizzesInLesson
);

router.delete("/:id", LessonController.deleteLesson);

router.get("/module/:moduleId", LessonController.getLessonsByModule);

export const LessonRoutes = router;
