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

  async uploadCertificate(
    folderName: string,
    buffer: Buffer,
    filename: string
  ) {
    const filePath = `${rootFolder}/${folderName}/${Date.now()}_${filename}`;
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

  multipleFiles(folderName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).send("No files uploaded.");
      }

      try {
        const fileUploadPromises = req.files.map(
          (file: Express.Multer.File) => {
            const { originalname, buffer, mimetype } = file;
            const filePath = `${rootFolder}/${folderName}/${Date.now()}_${originalname}`;
            const blob = firebaseBucket.file(filePath);
            const blobStream = blob.createWriteStream({
              resumable: false,
              contentType: mimetype,
            });

            return new Promise<string>((resolve, reject) => {
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
                  reject(new ApiError(400, "Failed to generate file URL"));
                }
              });

              blobStream.end(buffer);
            });
          }
        );

        req.urls = await Promise.all(fileUploadPromises);
        next();
      } catch (error) {
        next(new ApiError(400, "Failed to upload multiple files"));
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
