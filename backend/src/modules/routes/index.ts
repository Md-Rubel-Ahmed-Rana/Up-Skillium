import { Router } from "express";
import { AuthRoutes } from "../auth/route";
import { CourseRoutes } from "../course/routes";
import { StudentRoutes } from "../student/routes";
import { RoleRoutes } from "../role/routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/course", CourseRoutes);

router.use("/student", StudentRoutes);

router.use("/role", RoleRoutes);

export const RootRoutes = router;
