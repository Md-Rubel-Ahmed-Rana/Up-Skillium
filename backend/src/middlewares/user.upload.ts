import { NextFunction, Request, Response } from "express";
import { CloudinaryService } from "../cloudinary";
import { MediaFolderEnum } from "../constants/mediaFolders";

class Middleware {
  async uploadUserProfilePicture(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (req.file) {
      req.body.profilePictureUrl = await CloudinaryService.uploadSingle(
        req.file as Express.Multer.File,
        MediaFolderEnum.USER_PROFILE_PICTURES,
        "image",
      );
    }
    next();
  }
}

export const UserUploadMiddleware = new Middleware();
