import { Router } from "express";
import { AssignmentSubmissionController } from "./controller";

const router = Router();

router.post(
  "/submit/:userId/:courseId/:moduleId/:lessonId",
  AssignmentSubmissionController.submit
);

router.get("/", AssignmentSubmissionController.getAllSubmission);

router.get("/pending", AssignmentSubmissionController.getAllPendingSubmissions);

router.get(
  "/reviewed",
  AssignmentSubmissionController.getAllReviewedSubmissions
);

router.get(
  "/by-lesson/:userId/:lessonId",
  AssignmentSubmissionController.getAssignmentSubmissionByLessonId
);

router.patch("/review", AssignmentSubmissionController.updateAssignmentReview);

router.patch("/id", AssignmentSubmissionController.updateSubmission);

export const AssignmentSubmissionRoutes = router;
