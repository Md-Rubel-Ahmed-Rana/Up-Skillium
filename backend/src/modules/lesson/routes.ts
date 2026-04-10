import { Router } from "express";
import { LessonController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post("/create", JwtInstance.verifyToken, LessonController.createLesson);

router.post(
  "/create/type/instruction",
  JwtInstance.verifyToken,
  LessonController.createLesson
);

router.post(
  "/create/type/assignment",
  JwtInstance.verifyToken,
  LessonController.createLesson
);

router.post(
  "/create/type/quiz",
  JwtInstance.verifyToken,
  LessonController.createQuizLesson
);

router.post(
  "/create/type/video",
  JwtInstance.verifyToken,
  upload.single("video"),
  FileUploadMiddleware.uploadLessonVideo,
  LessonController.createVideoLesson
);

router.get("/", JwtInstance.verifyToken, LessonController.getAllLessons);

router.get("/:id", JwtInstance.verifyToken, LessonController.getLessonById);

router.get(
  "/quiz-correct-answer/:lessonId",
  JwtInstance.verifyToken,
  LessonController.getLessonByIdWithQuizCorrectAnswer
);

router.patch("/:id", JwtInstance.verifyToken, LessonController.updateLesson);

router.patch(
  "/update-quizzes/:lessonId",
  JwtInstance.verifyToken,
  LessonController.updateQuizzesInLesson
);

router.delete("/:id", JwtInstance.verifyToken, LessonController.deleteLesson);

router.get(
  "/module/:moduleId",
  JwtInstance.verifyToken,
  LessonController.getLessonsByModule
);

router.get(
  "/by-instructor/lessons/:instructorId",
  JwtInstance.verifyToken,
  LessonController.getAllLessonsByInstructor
);

router.get(
  "/by-instructor/quizzes/:instructorId",
  JwtInstance.verifyToken,
  LessonController.getAllQuizLessonsByInstructor
);

router.get(
  "/by-instructor/assignments/:instructorId",
  JwtInstance.verifyToken,
  LessonController.getAllAssignmentLessonsByInstructor
);

export const LessonRoutes = router;
