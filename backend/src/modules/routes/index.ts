import { Router } from "express";
import { AuthRoutes } from "../auth/route";
import { CourseRoutes } from "../course/routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/course", CourseRoutes);

export const RootRoutes = router;
