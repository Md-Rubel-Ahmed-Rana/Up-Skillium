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
      const newImageUrl = await CloudinaryService.uploadSingle(
        req.file as Express.Multer.File,
        MediaFolderEnum.USER_PROFILE_PICTURES,
        "image",
      );
      req.url = newImageUrl;
    }
    next();
  }
}

export const UserUploadMiddleware = new Middleware();
