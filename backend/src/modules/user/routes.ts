import { Router } from "express";
import { UserController } from "./controller";
import { JwtInstance } from "@/lib/jwt";
import upload from "@/config/multer";
import { UserUploadMiddleware } from "@/middlewares/user.upload";

const router = Router();

router.get("/", UserController.findUsers);

router.get("/students", UserController.getAllStudent);

router.get("/team", UserController.getAllTeamMembers);

router.get(
  "/analytics-summary",
  JwtInstance.verifyToken,
  UserController.getUserAnalyticsSummary,
);

router.get("/:id", UserController.getSingleUser);

router.patch("/:id", JwtInstance.verifyToken, UserController.updateUser);

router.delete(
  "/:id",
  JwtInstance.verifyToken,
  UserController.deleteUserAccount,
);

router.patch(
  "/update-status/:id/:status",
  JwtInstance.verifyToken,
  UserController.activeOrInactiveAccount,
);

router.patch("/change-password/:userId", UserController.changePassword);

router.post("/reset-password", UserController.resetPassword);

router.patch(
  "/update-basic-info/:id",
  JwtInstance.verifyToken,
  UserController.updateUserBasicInfo,
);

router.patch(
  "/update-address/:id",
  JwtInstance.verifyToken,
  UserController.updateUserAddress,
);

router.patch(
  "/update-emergency-contact/:id",
  JwtInstance.verifyToken,
  UserController.updateEmergencyContact,
);

router.patch(
  "/change-profile-picture/:id",
  JwtInstance.verifyToken,
  upload.single("file"),
  UserUploadMiddleware.uploadUserProfilePicture,
  UserController.updateProfileImage,
);

export const UserRoutes = router;
