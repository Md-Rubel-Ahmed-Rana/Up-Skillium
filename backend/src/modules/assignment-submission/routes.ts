import { Router } from "express";
import { AssignmentSubmissionController } from "./controller";

const router = Router();

router.post(
  "/submit/:userId/:courseId/:moduleId/:lessonId",
  AssignmentSubmissionController.submit
);

export const AssignmentSubmissionRoutes = router;
