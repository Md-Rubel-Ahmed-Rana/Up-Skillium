import { Router } from "express";
import { AuthRoutes } from "../auth/route";
import { CourseRoutes } from "../course/routes";
import { StudentRoutes } from "../student/routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/course", CourseRoutes);

router.use("/student", StudentRoutes);

export const RootRoutes = router;
