import { Router } from "express";
import { MyCourseController } from "./controller";

const router = Router();

router.get("/:userId", MyCourseController.getMyCourses);

router.get("/single/:userId/:courseId", MyCourseController.getMySingleCourse);

router.post(
  "/compete-lesson/:userId/:courseId/:lessonId",
  MyCourseController.completeLesson
);

export const MyCourseRoutes = router;
