import { Router } from "express";
import { CategoryController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  CategoryController.createCategory
);

router.get("/", JwtInstance.verifyToken, CategoryController.getCategories);

router.patch("/", JwtInstance.verifyToken, CategoryController.updateCategories);

router.delete(
  "/",
  JwtInstance.verifyToken,
  CategoryController.deleteCategories
);

export const CategoryRoutes = router;
