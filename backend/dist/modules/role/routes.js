"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/create", controller_1.RoleController.createRole);
router.get("/", controller_1.RoleController.getAllRoles);
router.get("/:id", controller_1.RoleController.getRoleById);
router.get("/by-name/:role", controller_1.RoleController.getRoleByRoleName);
router.patch("/:id", controller_1.RoleController.updateRole);
router.delete("/:id", controller_1.RoleController.deleteRole);
exports.RoleRoutes = router;