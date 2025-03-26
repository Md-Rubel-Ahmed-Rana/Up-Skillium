import { Router } from "express";
import { EnrollmentController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  EnrollmentController.createEnrollment
);

router.get(
  "/single/:id",
  JwtInstance.verifyToken,
  EnrollmentController.getEnrollmentById
);

router.patch(
  "/:id",
  JwtInstance.verifyToken,
  EnrollmentController.updateEnrollment
);

router.delete(
  "/:id",
  JwtInstance.verifyToken,
  EnrollmentController.deleteEnrollment
);

router.get(
  "/",
  JwtInstance.verifyToken,
  EnrollmentController.getAllSuccessEnrollments
);

router.get(
  "/order-history",
  JwtInstance.verifyToken,
  EnrollmentController.getAllOrderHistory
);

router.get(
  "/student/:userId",
  JwtInstance.verifyToken,
  EnrollmentController.getSuccessEnrollmentForStudent
);

router.get(
  "/student-order-history/:userId",
  JwtInstance.verifyToken,
  EnrollmentController.getOrderEnrollmentHistoryForStudent
);

router.get(
  "/search",
  JwtInstance.verifyToken,
  EnrollmentController.searchEnrollments
);

export const EnrollmentRoutes = router;
