import { Router } from "express";
import { CourseOutlineController } from "./controller";

const router = Router();

router.post("/create", CourseOutlineController.createOutline);

router.get("/", CourseOutlineController.getOutlines);

router.get("/:id", CourseOutlineController.getOutline);

router.get("/by-course/:courseId", CourseOutlineController.getOutlineByCourse);

router.patch(
  "/update-module-serial/:courseId",
  CourseOutlineController.updateModuleSerialNumberFromDragDrop
);

router.patch(
  "/update-module-name/:courseId/:moduleId",
  CourseOutlineController.updateModuleName
);

router.delete(
  "/delete-module/:courseId/:moduleId",
  CourseOutlineController.deleteModule
);

router.patch("/:id", CourseOutlineController.updateOutlineModules);

router.delete("/:id", CourseOutlineController.deleteOutline);

router.get(
  "/by-instructor/outlines/:instructorId",
  CourseOutlineController.getOutlinesByInstructor
);

export const CourseOutlineRoutes = router;
