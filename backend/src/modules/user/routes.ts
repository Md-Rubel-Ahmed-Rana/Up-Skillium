import { Router } from "express";
import { UserController } from "./controller";

const router = Router();

router.get("/", UserController.findUsers);

router.patch("/:id", UserController.updateUser);

router.patch("/change-password/:userId", UserController.changePassword);

export const UserRoutes = router;
