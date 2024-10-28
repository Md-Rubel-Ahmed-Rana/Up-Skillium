import { Router } from "express";
import { AuthRoutes } from "../auth/route";
import { CourseRoutes } from "../course/routes";
import { StudentRoutes } from "../student/routes";
import { RoleRoutes } from "../role/routes";
import { InstructorRoutes } from "../instructor/routes";
import { AdminRoutes } from "../admin/routes";
import { CategoryRoutes } from "../category/routes";
import { CourseOutlineRoutes } from "../course-outline/routes";
import { EducationRoutes } from "../education/routes";
import { UserRoutes } from "../user/routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/user", UserRoutes);

router.use("/course", CourseRoutes);

router.use("/student", StudentRoutes);

router.use("/instructor", InstructorRoutes);

router.use("/admin", AdminRoutes);

router.use("/role", RoleRoutes);

router.use("/category", CategoryRoutes);

router.use("/course-outline", CourseOutlineRoutes);

router.use("/education", EducationRoutes);

export const RootRoutes = router;
