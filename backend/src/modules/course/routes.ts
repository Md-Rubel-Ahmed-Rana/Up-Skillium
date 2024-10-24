import { Router } from "express";
import { CourseController } from "./controller";

const router = Router();

router.post("/create", CourseController.createCourse);

router.get("/", CourseController.getCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch("/:id", CourseController.updateCourse);

router.delete("/:id", CourseController.deleteCourse);

export const CourseRoutes = router;
