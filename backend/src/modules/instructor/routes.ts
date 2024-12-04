import { Router } from "express";
import { InstructorController } from "./controller";

const router = Router();

router.post("/create", InstructorController.createNewInstructor);

router.get("/", InstructorController.getAllInstructors);

router.get(
  "/my-students/:instructorUserId",
  InstructorController.getMyStudents
);

export const InstructorRoutes = router;
