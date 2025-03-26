import { Router } from "express";
import { UserController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.get("/", JwtInstance.verifyToken, UserController.findUsers);

router.get("/:id", JwtInstance.verifyToken, UserController.getSingleUser);

router.patch("/:id", JwtInstance.verifyToken, UserController.updateUser);

router.delete(
  "/:id",
  JwtInstance.verifyToken,
  UserController.deleteUserAccount
);

router.patch(
  "/update-status/:id/:status",
  JwtInstance.verifyToken,
  UserController.activeOrInactiveAccount
);

router.patch("/change-password/:userId", UserController.changePassword);

router.post("/reset-password", UserController.resetPassword);

router.patch(
  "/update-basic-info/:id",
  JwtInstance.verifyToken,
  UserController.updateUserBasicInfo
);

router.patch(
  "/update-address/:id",
  JwtInstance.verifyToken,
  UserController.updateUserAddress
);

router.patch(
  "/update-emergency-contact/:id",
  JwtInstance.verifyToken,
  UserController.updateEmergencyContact
);

router.patch(
  "/change-profile-picture/:id",
  JwtInstance.verifyToken,
  upload.single("file"),
  FileUploadMiddleware.singleFile("profile-picture"),
  UserController.updateProfileImage
);

export const UserRoutes = router;
