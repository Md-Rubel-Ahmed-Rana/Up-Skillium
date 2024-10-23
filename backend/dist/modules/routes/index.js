"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoutes = void 0;
const express_1 = require("express");
const route_1 = require("../auth/route");
const router = (0, express_1.Router)();
router.use("/auth", route_1.AuthRoutes);
exports.RootRoutes = router;
