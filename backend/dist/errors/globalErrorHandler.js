"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const apiError_1 = __importDefault(require("../shared/apiError"));
class ErrorHandler {
    constructor() {
        this.statusCode = 500;
        this.message = "Something went wrong";
        this.errorMessages = [];
        this.globalErrorHandler = (error, req, res, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next) => {
            if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
                this.handleValidationError(error);
            }
            else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
                this.handleCastError(error);
            }
            else if (error instanceof zod_1.ZodError) {
                this.handleZodValidationError(error);
            }
            else if (error instanceof apiError_1.default) {
                this.handleGenericError(error);
            }
            else if (error instanceof Error) {
                this.handleGenericError(error);
            }
            res.status(Number(this.statusCode)).json({
                success: false,
                message: this.message,
                errorMessages: this.errorMessages,
                stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
            });
        };
        this.handleError = (error) => {
            if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
                this.handleValidationError(error);
            }
            else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
                this.handleCastError(error);
            }
            else if (error instanceof zod_1.ZodError) {
                this.handleZodValidationError(error);
            }
            else if (error instanceof apiError_1.default) {
                this.handleGenericError(error);
            }
            else if (error instanceof Error) {
                this.handleGenericError(error);
            }
            return {
                success: false,
                message: this.message,
                errorMessage: this.errorMessages,
                stack: process.env.NODE_ENV !== "prod" ? error.stack : undefined,
            };
        };
    }
    handleZodValidationError(error) {
        const errors = error.issues.map((issue) => {
            return {
                path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue === null || issue === void 0 ? void 0 : issue.message,
            };
        });
        this.statusCode = 400;
        this.message = "Validation Error";
        this.errorMessages = errors;
    }
    handleApiError(error) {
        this.statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
        this.message = error.message || "Something went wrong";
        this.errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error.message,
                },
            ]
            : [];
    }
    handleGenericError(error) {
        this.message = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong";
        this.errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error.message,
                },
            ]
            : [];
    }
    handleCastError(error) {
        const errors = [
            {
                path: error.path,
                message: "Invalid id!",
            },
        ];
        this.errorMessages = errors;
        this.statusCode = 400;
        this.message = `Invalid ${error.path}`;
    }
    handleValidationError(error) {
        const errors = Object.values(error.errors).map((el) => {
            return {
                path: el === null || el === void 0 ? void 0 : el.path,
                message: el === null || el === void 0 ? void 0 : el.message,
            };
        });
        this.statusCode = 400;
        this.errorMessages = errors;
        this.message = "Validation Error!";
    }
}
exports.default = new ErrorHandler();
