import { Router } from "express";
import { LiveClassController } from "./controller";

const router = Router();

router.post("/create", LiveClassController.createLiveClass);

router.get("/", LiveClassController.getAllLiveClasses);

router.get("/:id", LiveClassController.getSingleClass);

router.get(
  "/by-instructor/classes/:instructorId",
  LiveClassController.getLiveClassesByInstructor
);

router.patch("/:id", LiveClassController.updateClass);

router.delete("/:id", LiveClassController.deleteClass);

export const LiveClassRoutes = router;
