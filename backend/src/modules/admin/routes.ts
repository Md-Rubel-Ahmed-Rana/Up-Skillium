import { Router } from "express";
import { AdminController } from "./controller";

const router = Router();

router.post("/create", AdminController.createNewAdmin);

export const AdminRoutes = router;
