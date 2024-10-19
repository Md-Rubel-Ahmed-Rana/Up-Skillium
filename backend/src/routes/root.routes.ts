/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Check server health
 *     description: Returns a message indicating the server's health status.
 *     responses:
 *       200:
 *         description: Server is up and running
 */

import { Router } from "express";
import { UserRoutes } from "./user.routes";

const router = Router();

router.use("/user", UserRoutes);

export const RootRoutes = router;
