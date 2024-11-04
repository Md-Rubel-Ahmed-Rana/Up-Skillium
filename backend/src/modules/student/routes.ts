import { Router } from "express";
import { StudentController } from "./controller";

const router = Router();

router.post("/create", StudentController.createNewStudent);

router.get("/:userId", StudentController.getMyCourses);

export const StudentRoutes = router;
