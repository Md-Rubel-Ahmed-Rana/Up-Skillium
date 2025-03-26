import { Router } from "express";
import { AssignmentSubmissionController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/submit",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.submit
);

router.get(
  "/",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getAllSubmission
);

router.get(
  "/single/:id",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getSingleSubmission
);

router.get(
  "/pending",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getAllPendingSubmissions
);

router.get(
  "/reviewed",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getAllReviewedSubmissions
);

router.get(
  "/by-lesson/:userId/:lessonId",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getAssignmentSubmissionByLessonId
);

router.patch(
  "/review",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.updateAssignmentReview
);

router.patch(
  "/:id",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.updateSubmission
);

router.get(
  "/by-instructor/pending/:instructorId",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getPendingAssignmentByInstructor
);

router.get(
  "/by-instructor/completed/:instructorId",
  JwtInstance.verifyToken,
  AssignmentSubmissionController.getCompletedAssignmentByInstructor
);

export const AssignmentSubmissionRoutes = router;
