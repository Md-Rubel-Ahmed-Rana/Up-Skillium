import { Router } from "express";
import { AssignmentController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.get(
  "/",
  JwtInstance.verifyToken,
  AssignmentController.getAllAssignments
);

router.get(
  "/:id",
  JwtInstance.verifyToken,
  AssignmentController.getSingleAssignment
);

router.patch(
  "/:id",
  JwtInstance.verifyToken,
  AssignmentController.updateAssignment
);

router.delete(
  "/:id",
  JwtInstance.verifyToken,
  AssignmentController.deleteAssignment
);

export const AssignmentRoutes = router;
