import { Router } from "express";
import { MyCourseController } from "./controller";

const router = Router();

router.post("/add-new-course", MyCourseController.addNewCourse);

router.get("/:userId", MyCourseController.getMyCourses);

router.post(
  "/compete-lesson/:userId/:courseId/:lessonId",
  MyCourseController.completeLesson
);

export const MyCourseRoutes = router;
