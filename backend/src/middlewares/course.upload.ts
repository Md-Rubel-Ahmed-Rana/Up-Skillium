import { NextFunction, Request, Response } from "express";
import { CloudinaryService } from "../cloudinary";
import { MediaFolderEnum } from "../constants/mediaFolders";

const parseJSON = (input: string | undefined, defaultValue: any) => {
  try {
    return input ? JSON.parse(input) : defaultValue;
  } catch {
    return defaultValue;
  }
};

class Middleware {
  async uploadCourseThumbnailAndIntroductoryVideo(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const files = req.files as {
        image?: Express.Multer.File[];
        introductoryVideo?: Express.Multer.File[];
      };

      req.body.tags = parseJSON(req.body.tags, []);
      req.body.technologies = parseJSON(req.body.technologies, []);
      req.body.price = parseJSON(req.body.price, {
        original: 0,
        discount: 0,
        salePrice: 0,
      });

      if (req.files && Object.keys(req.files).length > 0) {
        const imageFile = files.image?.[0];
        const videoFile = files.introductoryVideo?.[0];

        if (imageFile) {
          req.body.image = await CloudinaryService.uploadSingle(
            imageFile,
            MediaFolderEnum.COURSE_THUMBNAILS,
            "image",
          );
        }

        if (videoFile) {
          req.body.introductoryVideo = await CloudinaryService.uploadSingle(
            videoFile,
            MediaFolderEnum.COURSE_INTRODUCTORY_VIDEOS,
            "video",
          );
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async updateCourseThumbnail(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const file = req.file as Express.Multer.File;
    try {
      const imageUrl = await CloudinaryService.uploadSingle(
        file,
        MediaFolderEnum.COURSE_THUMBNAILS,
        "image",
      );
      req.url = imageUrl;
      next();
    } catch (error) {
      next(error);
    }
  }

  async updateCourseIntroductoryVideo(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const file = req.file as Express.Multer.File;
    try {
      const imageUrl = await CloudinaryService.uploadSingle(
        file,
        MediaFolderEnum.COURSE_INTRODUCTORY_VIDEOS,
        "video",
      );
      req.url = imageUrl;
      next();
    } catch (error) {
      next(error);
    }
  }

  async uploadLessonVideo(req: Request, res: Response, next: NextFunction) {
    if (req.file) {
      req.body.videoUrl = await CloudinaryService.uploadSingle(
        req.file as Express.Multer.File,
        MediaFolderEnum.COURSE_LESSONS,
        "video",
      );
    }
    next();
  }
}

export const CourseUploadMiddleware = new Middleware();
