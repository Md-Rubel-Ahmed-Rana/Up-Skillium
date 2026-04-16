import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import config from "./envConfig";
import ApiError from "@/shared/apiError";
import { HttpStatusCode } from "@/lib/httpStatus";

type FileType = "image" | "video" | "raw" | "auto";

class Service {
  constructor() {
    cloudinary.config({
      cloud_name: config.cloudinary.name,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
    });
  }

  async uploadSingle(
    file: Express.Multer.File,
    folderName: string,
    fileType: FileType = "raw",
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const ext = this.getExtensionFromMimeType(file.mimetype) || "pdf";
      const publicId = `${folderName}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: fileType || "raw",
          public_id: publicId,
          asset_folder: folderName,
        },
        (error, result) => {
          if (error) return reject(error);
          console.log({ from: "[CLOUDINARY]: Single file upload", result });
          if (!result?.secure_url) {
            return reject(
              new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                "Cloudinary did not return a secure URL",
              ),
            );
          }
          resolve(result.secure_url);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  private getExtensionFromMimeType(mimetype: string): string | null {
    const map: Record<string, string> = {
      "application/pdf": "pdf",
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
    };

    return map[mimetype] || null;
  }

  async deleteSingle(url: string, fileType: FileType = "raw") {
    if (!this.isCloudinaryUrl(url)) {
      console.info(
        `[CloudinaryService] Skip delete: non-Cloudinary or invalid URL -> ${url}`,
      );
      return {
        success: false,
        skipped: true,
        message: "URL is not a valid Cloudinary URL",
      };
    }

    const publicId = await this.extractPublicId(url);

    if (!publicId) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Invalid Cloudinary URL provided, unable to extract public ID",
      );
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: fileType },
        (error, result) => {
          if (error) {
            console.error("[CloudinaryService] Delete failed:", error);
            return reject(error);
          }

          console.log("[CloudinaryService] Delete result:", result);
          resolve(result);
        },
      );
    });
  }

  private async extractPublicId(url: string): Promise<string | null> {
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split("/");

      const uploadIndex = parts.findIndex((part) => part === "upload");

      if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
        return null;
      }

      const afterUpload = parts.slice(uploadIndex + 1);

      const versionRegex = /^v\d+$/;
      const relevantParts = versionRegex.test(afterUpload[0])
        ? afterUpload.slice(1)
        : afterUpload;

      const publicIdWithExtension = relevantParts.join("/");
      const lastDotIndex = publicIdWithExtension.lastIndexOf(".");

      if (lastDotIndex === -1) {
        return publicIdWithExtension;
      }

      return publicIdWithExtension.substring(0, lastDotIndex);
    } catch {
      return null;
    }
  }

  private isCloudinaryUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);

      return (
        parsedUrl.hostname === "res.cloudinary.com" ||
        parsedUrl.hostname.endsWith(".cloudinary.com")
      );
    } catch {
      return false;
    }
  }
}

export const CloudinaryService = new Service();
