import { Router } from "express";
import { AssignmentController } from "./controller";

const router = Router();

router.get("/", AssignmentController.getAllAssignments);

router.get("/:id", AssignmentController.getSingleAssignment);

router.patch("/:id", AssignmentController.updateAssignment);

router.delete("/:id", AssignmentController.deleteAssignment);

export const AssignmentRoutes = router;
