import { Router } from "express";
import { UserController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

const router = Router();

router.get("/", UserController.findUsers);

router.patch("/:id", UserController.updateUser);

router.patch("/change-password/:userId", UserController.changePassword);

router.patch("/update-basic-info/:id", UserController.updateUserBasicInfo);

router.patch(
  "/change-profile-picture/:id",
  upload.single("file"),
  FileUploadMiddleware.singleFile("profile-picture"),
  UserController.updateProfileImage
);

export const UserRoutes = router;
