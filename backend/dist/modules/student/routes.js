"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/create", controller_1.StudentController.createNewStudent);
exports.StudentRoutes = router;
