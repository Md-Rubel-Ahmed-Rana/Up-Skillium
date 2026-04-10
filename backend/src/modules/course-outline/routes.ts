import { Router } from "express";
import { CourseOutlineController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  CourseOutlineController.createOutline
);

router.get("/", CourseOutlineController.getOutlines);

router.get("/:id", CourseOutlineController.getOutline);

router.get("/by-course/:courseId", CourseOutlineController.getOutlineByCourse);

router.patch(
  "/update-module-serial/:courseId",
  JwtInstance.verifyToken,
  CourseOutlineController.updateModuleSerialNumberFromDragDrop
);

router.patch(
  "/update-module-name/:courseId/:moduleId",
  JwtInstance.verifyToken,
  CourseOutlineController.updateModuleName
);

router.delete(
  "/delete-module/:courseId/:moduleId",
  JwtInstance.verifyToken,
  CourseOutlineController.deleteModule
);

router.patch(
  "/:id",
  JwtInstance.verifyToken,
  CourseOutlineController.updateOutlineModules
);

router.delete("/:id", CourseOutlineController.deleteOutline);

router.get(
  "/by-instructor/outlines/:instructorId",
  JwtInstance.verifyToken,
  CourseOutlineController.getOutlinesByInstructor
);

export const CourseOutlineRoutes = router;
