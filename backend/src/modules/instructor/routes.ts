import { Router } from "express";
import { InstructorController } from "./controller";

const router = Router();

router.post("/create", InstructorController.createNewInstructor);

router.get("/", InstructorController.getAllInstructors);

export const InstructorRoutes = router;
