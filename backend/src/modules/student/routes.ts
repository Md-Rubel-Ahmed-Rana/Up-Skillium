import { Router } from "express";
import { StudentController } from "./controller";

const router = Router();

router.post("/create", StudentController.createNewStudent);

export const StudentRoutes = router;
