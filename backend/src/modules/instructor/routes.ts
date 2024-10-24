import { Router } from "express";
import { InstructorController } from "./controller";

const router = Router();

router.post("/create", InstructorController.createNewInstructor);

export const InstructorRoutes = router;
