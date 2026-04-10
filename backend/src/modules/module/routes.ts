import { Router } from "express";
import { ModuleController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  ModuleController.createNewModule
);

router.get("/", JwtInstance.verifyToken, ModuleController.getAllModules);

router.get("/:id", JwtInstance.verifyToken, ModuleController.getSingleModule);

router.get(
  "/by-course/:courseId",
  JwtInstance.verifyToken,
  ModuleController.getModuleByCourseId
);

router.get(
  "/classes/:courseId",
  JwtInstance.verifyToken,
  ModuleController.getFullClassByCourseId
);

router.patch("/:id", JwtInstance.verifyToken, ModuleController.updateModule);

router.delete("/:id", JwtInstance.verifyToken, ModuleController.deleteModule);

router.get(
  "/by-instructor/modules/:instructorId",
  JwtInstance.verifyToken,
  ModuleController.getAllModulesByInstructor
);

export const ModuleRoutes = router;
