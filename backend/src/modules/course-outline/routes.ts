import { Router } from "express";
import { CourseOutlineController } from "./controller";

const router = Router();

router.post("/create", CourseOutlineController.createOutline);

router.get("/", CourseOutlineController.getOutlines);

router.get("/:id", CourseOutlineController.getOutline);

router.get("/by-course/:courseId", CourseOutlineController.getOutlineByCourse);

router.patch("/:id", CourseOutlineController.updateOutline);

router.delete("/:id", CourseOutlineController.deleteOutline);

export const CourseOutlineRoutes = router;
