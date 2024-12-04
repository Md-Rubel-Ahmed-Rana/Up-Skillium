import { NextFunction, Request, Response } from "express";
import { firebaseBucket } from "../config/firebase";
import ApiError from "../shared/apiError";
import extractFilePath from "../utils/extractFilePath";

const rootFolder = "up-skillium";

class FileUploader {
  singleFile(folderName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      const { originalname, buffer } = req.file;

      const filePath = `${rootFolder}/${folderName}/${Date.now()}_${originalname}`;
      const blob = firebaseBucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      blobStream.on("error", (err) => {
        throw new ApiError(400, "Failed to blob stream file");
      });

      blobStream.on("finish", async () => {
        try {
          const [url] = await blob.getSignedUrl({
            action: "read",
            expires: "01-01-2030",
          });
          req.url = url;
          next();
        } catch (err) {
          throw new ApiError(400, "Failed to upload file");
        }
      });

      blobStream.end(buffer);
    };
  }
  uploadSingleFile(
    folderName: string,
    file: Express.Multer.File
  ): Promise<string> {
    const { originalname, buffer } = file;

    return new Promise((resolve, reject) => {
      const filePath = `${rootFolder}/${folderName}/${Date.now()}_${originalname}`;
      const blob = firebaseBucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });

      blobStream.on("error", (err) => {
        reject(new ApiError(400, "Failed to blob stream file"));
      });

      blobStream.on("finish", async () => {
        try {
          const [url] = await blob.getSignedUrl({
            action: "read",
            expires: "01-01-2030",
          });
          resolve(url);
        } catch (err) {
          reject(new ApiError(400, "Failed to upload file"));
        }
      });

      blobStream.end(buffer);
    });
  }

  uploadLessonVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.file) {
      req.body.videoUrl = await this.uploadSingleFile(
        "lesson-videos",
        req.file
      );
    }
    next();
  };

  async uploadCertificate(
    folderName: string,
    buffer: Buffer,
    filename: string
  ) {
    const filePath = `${rootFolder}/${folderName}/${filename}`;
    const blob = firebaseBucket.file(filePath);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: "application/pdf",
    });

    return new Promise<string>((resolve, reject) => {
      blobStream.on("error", (err) => {
        reject(err);
      });

      blobStream.on("finish", async () => {
        try {
          const [url] = await blob.getSignedUrl({
            action: "read",
            expires: "01-01-2030",
          });
          resolve(url);
        } catch (err) {
          reject(err);
        }
      });

      blobStream.end(buffer);
    });
  }

  uploadCourseImageAndIntroVideo() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const parseJSON = (input: string | undefined, defaultValue: any) => {
          try {
            return input ? JSON.parse(input) : defaultValue;
          } catch {
            return defaultValue;
          }
        };

        req.body.tags = parseJSON(req.body.tags, []);
        req.body.technologies = parseJSON(req.body.technologies, []);
        req.body.price = parseJSON(req.body.price, {
          original: 0,
          discount: 0,
          salePrice: 0,
        });

        if (req.files && Object.keys(req.files).length > 0) {
          const files = req.files as {
            image?: Express.Multer.File[];
            introductoryVideo?: Express.Multer.File[];
          };

          const imageFile = files.image?.[0];
          const videoFile = files.introductoryVideo?.[0];

          if (imageFile) {
            req.body.image = await this.uploadSingleFile(
              "course-thumbnail-images",
              imageFile
            );
          }

          if (videoFile) {
            req.body.introductoryVideo = await this.uploadSingleFile(
              "course-introductory-videos",
              videoFile
            );
          }
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }

  async deleteSingle(url: string) {
    const filePath = extractFilePath(url);
    if (filePath) {
      try {
        const file = firebaseBucket.file(filePath);
        await file.delete();
        return;
      } catch (error) {
        console.log("Error to delete file");
        return;
      }
    } else {
      return;
    }
  }
}

export const FileUploadMiddleware = new FileUploader();
