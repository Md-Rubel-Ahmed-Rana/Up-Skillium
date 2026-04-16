import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import mongoose from "mongoose";
import { HttpStatusCode } from "@/lib/httpStatus";
import multer from "multer";
import Bugsnag from "@bugsnag/js";
import { IGenericErrorMessage } from "@/interfaces/common";
import ApiError from "@/shared/apiError";
import config from "@/config/envConfig";

class ErrorHandler {
  private statusCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR;
  private message: string = "Internal Server Error";
  private errorMessages: IGenericErrorMessage[] = [];

  constructor() {}

  // catch zod validation error
  public handleZodValidationError(error: ZodError) {
    const errors: IGenericErrorMessage[] = error.issues.map(
      (issue: ZodIssue) => {
        if (issue.code === "unrecognized_keys" && (issue as any).keys) {
          const keys = (issue as any).keys;
          return {
            path: issue?.path[issue.path.length - 1] || "body",
            message: `The field(s) ${keys.map((key: string) => `'${key}'`).join(", ")} are not allowed.`,
          };
        }

        if (
          issue.code === "custom" &&
          issue.message === "At least one field is required"
        ) {
          return {
            path: issue?.path[issue.path.length - 1] || "body",
            message: "Please provide at least one field to update.",
          };
        }

        return {
          path: issue?.path[issue.path.length - 1] || "body",
          message: issue?.message,
        };
      },
    );

    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.message = "Validation Error";
    this.errorMessages = errors;
  }

  // catch api errors
  public handleApiError(error: ApiError) {
    this.statusCode = error?.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.message = error.message || "Something went wrong";
    this.errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  // handle generic error
  public handleGenericError(error: Error) {
    this.message = error?.message || "Something went wrong";
    this.errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  // handle mongodb objectId cast/invalid error
  public handleCastError(error: mongoose.Error.CastError) {
    const errors: IGenericErrorMessage[] = [
      {
        path: error.path,
        message: "Invalid id!",
      },
    ];

    this.errorMessages = errors;
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.message = `Invalid MongoDB ObjectId`;
  }

  // handle mongoose validation error
  public handleMongodbValidationError(error: mongoose.Error.ValidationError) {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
      (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: el?.path,
          message: el?.message,
        };
      },
    );
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.errorMessages = errors;
    this.message = "Validation Error!";
  }

  // handle multer file size error
  public handleMulterError(error: multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      this.statusCode = HttpStatusCode.BAD_REQUEST;
      this.message =
        "Image exceeds 5MB size limit. Please upload a smaller file.";
      this.errorMessages = [
        {
          path: "file",
          message: "Image exceeds 5MB size limit.",
        },
      ];
    } else {
      this.statusCode = HttpStatusCode.BAD_REQUEST;
      this.message = error.message || "File upload error.";
      this.errorMessages = [
        {
          path: "file",
          message: error.message,
        },
      ];
    }
  }

  public globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (error instanceof ZodError) {
      this.handleZodValidationError(error);
    } else if (
      error instanceof ApiError ||
      error?.constructor?.name === "ApiError" ||
      (error?.statusCode && typeof error.statusCode === "number")
    ) {
      this.handleApiError(error as ApiError);
    } else if (error instanceof multer.MulterError) {
      this.handleMulterError(error);
    } else if (error instanceof mongoose.Error.CastError) {
      this.handleCastError(error);
    } else if (error instanceof mongoose.Error.ValidationError) {
      this.handleMongodbValidationError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error);
    }

    Bugsnag.notify(new Error(this.message), (event) => {
      event.addMetadata("[Global Error handler]", {
        statusCode: this.statusCode,
        success: false,
        message: this.message,
        method: req.method,
        traceId: req.traceId || null,
        user: {
          id: req.user?.id || "Unknown",
          email: req.user?.email || "Unknown",
        },
        ipAddress: req.ip || "Unknown",
        errorMessage: this.errorMessages,
        stack: error?.stack || {},
      });
    });

    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      success: false,
      message: this.message,
      traceId: req.traceId || null,
      errorMessages: this.errorMessages,
      stack: config.app.env !== "production" ? error.stack : undefined,
    });
  };
}

export default new ErrorHandler();
