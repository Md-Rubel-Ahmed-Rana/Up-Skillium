import { Router } from "express";
import { ModuleController } from "./controller";

const router = Router();

router.post("/create", ModuleController.createNewModule);

router.get("/", ModuleController.getAllModules);

router.get("/:id", ModuleController.getSingleModule);

router.get("/by-course/:courseId", ModuleController.getModuleByCourseId);

router.get("/classes/:courseId", ModuleController.getFullClassByCourseId);

router.patch("/:id", ModuleController.updateModule);

router.delete("/:id", ModuleController.deleteModule);

export const ModuleRoutes = router;
