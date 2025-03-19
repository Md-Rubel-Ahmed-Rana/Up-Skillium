import { Router } from "express";
import { AssignmentSubmissionController } from "./controller";

const router = Router();

router.post("/submit", AssignmentSubmissionController.submit);

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

router.patch("/:id", AssignmentSubmissionController.updateSubmission);

router.get(
  "/by-instructor/pending/:instructorId",
  AssignmentSubmissionController.getPendingAssignmentByInstructor
);

router.get(
  "/by-instructor/completed/:instructorId",
  AssignmentSubmissionController.getCompletedAssignmentByInstructor
);

export const AssignmentSubmissionRoutes = router;
