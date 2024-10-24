import { Router } from "express";
import { RoleController } from "./controller";

const router = Router();

router.post("/create", RoleController.createRole);

router.get("/", RoleController.getAllRoles);

router.get("/:id", RoleController.getRoleById);

router.get("/by-name/:role", RoleController.getRoleByRoleName);

router.patch("/:id", RoleController.updateRole);

router.delete("/:id", RoleController.deleteRole);

export const RoleRoutes = router;
