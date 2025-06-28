import { Router } from "express";
import { CartController } from "./controller";

const router = Router();

router.post("/", CartController.addToCart);

router.get("/", CartController.getAllCart);

router.get("/:userId", CartController.getUserCart);

router.delete("/:cartId", CartController.removeFromCart);

router.post("/checkout", CartController.checkout);

export const CartRoutes = router;
