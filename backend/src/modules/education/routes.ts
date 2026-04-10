import { Router } from "express";
import { EducationController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post("/add", JwtInstance.verifyToken, EducationController.addEducation);

router.get("/", JwtInstance.verifyToken, EducationController.getEducations);

router.get("/:id", JwtInstance.verifyToken, EducationController.getEducation);

router.get(
  "/by-user/:userId",
  JwtInstance.verifyToken,
  EducationController.getEducationsByUserId
);

router.patch(
  "/:id",
  JwtInstance.verifyToken,
  EducationController.updateEducation
);

router.delete(
  "/:id",
  JwtInstance.verifyToken,
  EducationController.deleteEducation
);

export const EducationRoutes = router;
