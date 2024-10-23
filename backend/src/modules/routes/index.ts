import { Router } from "express";
import { AuthRoutes } from "../auth/route";
import { StudentRoutes } from "../student/routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/student", StudentRoutes);

export const RootRoutes = router;
