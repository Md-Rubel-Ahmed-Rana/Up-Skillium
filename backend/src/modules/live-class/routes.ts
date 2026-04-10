import { Router } from "express";
import { LiveClassController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  LiveClassController.createLiveClass
);

router.get("/", JwtInstance.verifyToken, LiveClassController.getAllLiveClasses);

router.get("/:id", JwtInstance.verifyToken, LiveClassController.getSingleClass);

router.get(
  "/instructor/classes/completed/:instructorId",
  JwtInstance.verifyToken,
  LiveClassController.getCompletedLiveClassesByInstructor
);

router.get(
  "/instructor/classes/upcoming/:instructorId",
  JwtInstance.verifyToken,
  LiveClassController.getUpcomingLiveClassesByInstructor
);

router.get(
  "/student/classes/:studentId",
  JwtInstance.verifyToken,
  LiveClassController.getLiveClassesByStudent
);

router.patch("/:id", JwtInstance.verifyToken, LiveClassController.updateClass);

router.patch(
  "/update-students-attendees/:liveClassId",
  JwtInstance.verifyToken,
  LiveClassController.updateStudentsAttendees
);

router.delete("/:id", JwtInstance.verifyToken, LiveClassController.deleteClass);

export const LiveClassRoutes = router;
