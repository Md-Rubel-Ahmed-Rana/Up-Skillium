import { Router } from "express";
import { EnrollmentController } from "./controller";

const router = Router();

router.post("/create", EnrollmentController.createEnrollment);

router.get("/:id", EnrollmentController.getEnrollmentById);

router.patch("/:id", EnrollmentController.updateEnrollment);

router.delete("/:id", EnrollmentController.deleteEnrollment);

router.get("/", EnrollmentController.getEnrollments);

router.get("/search", EnrollmentController.searchEnrollments);

export const EnrollmentRoutes = router;
