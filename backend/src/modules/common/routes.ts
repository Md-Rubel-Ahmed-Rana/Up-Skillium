import { Router } from "express";
import { CommonController } from "./controller";

const router = Router();

router.get("/documents", CommonController.getTotalDocumentCount);

export const CommonRoutes = router;
