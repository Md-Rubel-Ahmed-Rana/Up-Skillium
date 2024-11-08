import { Router } from "express";
import { AssignmentSubmissionController } from "./controller";

const router = Router();

router.post(
  "/submit/:userId/:courseId/:moduleId/:lessonId",
  AssignmentSubmissionController.submit
);

router.get(
  "/by-lesson/:userId/:lessonId",
  AssignmentSubmissionController.getAssignmentSubmissionByLessonId
);

router.patch("/review", AssignmentSubmissionController.updateAssignmentReview);

export const AssignmentSubmissionRoutes = router;
