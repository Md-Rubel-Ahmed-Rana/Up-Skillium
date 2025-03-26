import { Router } from "express";
import { RoleController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post("/create", JwtInstance.verifyToken, RoleController.createRole);

router.get("/", JwtInstance.verifyToken, RoleController.getAllRoles);

router.get("/:id", JwtInstance.verifyToken, RoleController.getRoleById);

router.get(
  "/by-name/:role",
  JwtInstance.verifyToken,
  RoleController.getRoleByRoleName
);

router.patch("/:id", JwtInstance.verifyToken, RoleController.updateRole);

router.delete("/:id", JwtInstance.verifyToken, RoleController.deleteRole);

export const RoleRoutes = router;
