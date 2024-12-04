import { Router } from "express";
import { StudentController } from "./controller";

const router = Router();

router.post("/create", StudentController.createNewStudent);

router.get("/:userId", StudentController.getMyCourses);

router.get("/", StudentController.getAllStudents);

export const StudentRoutes = router;
