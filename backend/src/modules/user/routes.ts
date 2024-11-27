import { Router } from "express";
import { UserController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

const router = Router();

router.get("/", UserController.findUsers);

router.get("/:id", UserController.getSingleUser);

router.patch("/:id", UserController.updateUser);

router.patch(
  "/update-status/:id/:status",
  UserController.activeOrInactiveAccount
);

router.patch("/change-password/:userId", UserController.changePassword);

router.patch("/update-basic-info/:id", UserController.updateUserBasicInfo);

router.patch("/update-address/:id", UserController.updateUserAddress);

router.patch(
  "/update-emergency-contact/:id",
  UserController.updateEmergencyContact
);

router.patch(
  "/change-profile-picture/:id",
  upload.single("file"),
  FileUploadMiddleware.singleFile("profile-picture"),
  UserController.updateProfileImage
);

export const UserRoutes = router;
