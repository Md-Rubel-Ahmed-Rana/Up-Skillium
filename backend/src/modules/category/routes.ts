import { Router } from "express";
import { CategoryController } from "./controller";

const router = Router();

router.post("/create", CategoryController.createCategory);

router.get("/", CategoryController.getCategories);

router.patch("/", CategoryController.updateCategories);

router.delete("/", CategoryController.deleteCategories);

export const CategoryRoutes = router;
