"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoutes = void 0;
const express_1 = require("express");
const route_1 = require("../auth/route");
const routes_1 = require("../course/routes");
const routes_2 = require("../student/routes");
const routes_3 = require("../role/routes");
const routes_4 = require("../instructor/routes");
const routes_5 = require("../admin/routes");
const routes_6 = require("../category/routes");
const routes_7 = require("../course-outline/routes");
const routes_8 = require("../education/routes");
const routes_9 = require("../user/routes");
const routes_10 = require("../module/routes");
const routes_11 = require("../lesson/routes");
const router = (0, express_1.Router)();
router.use("/auth", route_1.AuthRoutes);
router.use("/user", routes_9.UserRoutes);
router.use("/course", routes_1.CourseRoutes);
router.use("/student", routes_2.StudentRoutes);
router.use("/instructor", routes_4.InstructorRoutes);
router.use("/admin", routes_5.AdminRoutes);
router.use("/role", routes_3.RoleRoutes);
router.use("/category", routes_6.CategoryRoutes);
router.use("/course-outline", routes_7.CourseOutlineRoutes);
router.use("/module", routes_10.ModuleRoutes);
router.use("/lesson", routes_11.LessonRoutes);
router.use("/education", routes_8.EducationRoutes);
exports.RootRoutes = router;
