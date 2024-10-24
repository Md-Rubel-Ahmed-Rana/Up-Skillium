import { Router } from "express";
import { CourseController } from "./controller";

const router = Router();

router.post("/create", CourseController.createCourse);

export const CourseRoutes = router;
