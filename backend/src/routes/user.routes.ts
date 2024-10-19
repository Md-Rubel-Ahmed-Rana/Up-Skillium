import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { JwtMiddleware } from "../middlewares/JwtMiddleware";
import validateRequest from "../middlewares/validateRequest";
import { userValidationSchema } from "../validators/user.validator";
import checkAuthorization from "../middlewares/authorizeMiddleware";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidationSchema.postUserSchema),
  UserController.register
);

router.post(
  "/login",
  validateRequest(userValidationSchema.loginUserSchema),
  UserController.login
);

router.get("/auth", JwtMiddleware.authenticate, UserController.auth);

router.get("/", JwtMiddleware.authenticate, UserController.findUsers);

router.get(
  "/single/:id",
  JwtMiddleware.authenticate,
  UserController.findSingleUserById
);

router.patch(
  "/update/:id",
  JwtMiddleware.authenticate,
  checkAuthorization("admin", "super admin"),
  validateRequest(userValidationSchema.updateUserSchema),
  UserController.updateUser
);

router.delete(
  "/delete/:id",
  JwtMiddleware.authenticate,
  checkAuthorization("admin", "super admin"),
  UserController.deleteUser
);

export const UserRoutes = router;
