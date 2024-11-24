import { Router } from "express";
import { EnrollmentController } from "./controller";

const router = Router();

router.post("/create", EnrollmentController.createEnrollment);

router.get("/single/:id", EnrollmentController.getEnrollmentById);

router.patch("/:id", EnrollmentController.updateEnrollment);

router.delete("/:id", EnrollmentController.deleteEnrollment);

router.get("/", EnrollmentController.getAllSuccessEnrollments);

router.get("/order-history", EnrollmentController.getAllOrderHistory);

router.get(
  "/student/:userId",
  EnrollmentController.getSuccessEnrollmentForStudent
);

router.get(
  "/student-order-history/:userId",
  EnrollmentController.getOrderEnrollmentHistoryForStudent
);

router.get("/search", EnrollmentController.searchEnrollments);

export const EnrollmentRoutes = router;
