import { Router } from "express";
import { AuthController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.get("/", JwtInstance.verifyToken, AuthController.auth);

router.post("/login", AuthController.login);

router.delete("/logout", AuthController.logout);

export const AuthRoutes = router;
