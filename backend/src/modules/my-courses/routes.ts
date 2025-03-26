import { Router } from "express";
import { MyCourseController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.get(
  "/:userId",
  JwtInstance.verifyToken,
  MyCourseController.getMyCourses
);

router.get(
  "/single/:userId/:courseId",
  JwtInstance.verifyToken,
  MyCourseController.getMySingleCourse
);

router.post(
  "/compete-lesson/:userId/:courseId/:lessonId",
  JwtInstance.verifyToken,
  MyCourseController.completeLesson
);

export const MyCourseRoutes = router;
