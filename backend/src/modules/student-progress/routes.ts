import { StudentProgressController } from "./controller";
import { Router } from "express";

const router = Router();

router.post("/create", StudentProgressController.createStudentProgress);

router.get("/student/:userId", StudentProgressController.getStudentProgress);

router.get(
  "/course/:userId/:courseId",
  StudentProgressController.getSingleCourseProgress
);

export const StudentProgressRoutes = router;
