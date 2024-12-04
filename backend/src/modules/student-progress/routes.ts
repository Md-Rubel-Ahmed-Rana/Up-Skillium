import { StudentProgressController } from "./controller";
import { Router } from "express";

const router = Router();

router.post("/create", StudentProgressController.createStudentProgress);

router.get("/", StudentProgressController.getAllCoursesProgress);

router.get("/student/:userId", StudentProgressController.getStudentProgress);

router.get(
  "/courses/:userId",
  StudentProgressController.getAllCourseProgressForStudent
);

router.get(
  "/course/:userId/:courseId",
  StudentProgressController.getSingleCourseProgress
);

router.patch(
  "/users/:userId/courses/:courseId/modules/:moduleId/lessons/:lessonId/complete",
  StudentProgressController.completeLesson
);

export const StudentProgressRoutes = router;
