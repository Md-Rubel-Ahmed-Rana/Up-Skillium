import { Router } from "express";
import { EducationController } from "./controller";

const router = Router();

router.post("/add", EducationController.addEducation);

router.get("/", EducationController.getEducations);

router.get("/:id", EducationController.getEducation);

router.get("/by-user/:userId", EducationController.getEducationsByUserId);

router.patch("/:id", EducationController.updateEducation);

router.delete("/:id", EducationController.deleteEducation);

export const EducationRoutes = router;
