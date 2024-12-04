import { Router } from "express";
import { AdminController } from "./controller";

const router = Router();

router.post("/create", AdminController.createNewAdmin);

router.get("/", AdminController.getAllAdmins);

export const AdminRoutes = router;
