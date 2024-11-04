"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadMiddleware = void 0;
const firebase_1 = require("../config/firebase");
const apiError_1 = __importDefault(require("../shared/apiError"));
const extractFilePath_1 = __importDefault(require("../utils/extractFilePath"));
const rootFolder = "up-skillium";
class FileUploader {
    singleFile(folderName) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res.status(400).send("No file uploaded.");
            }
            const { originalname, buffer } = req.file;
            const filePath = `${rootFolder}/${folderName}/${Date.now()}_${originalname}`;
            const blob = firebase_1.firebaseBucket.file(filePath);
            const blobStream = blob.createWriteStream({
                resumable: false,
                contentType: req.file.mimetype,
            });
            blobStream.on("error", (err) => {
                throw new apiError_1.default(400, "Failed to blob stream file");
            });
            blobStream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const [url] = yield blob.getSignedUrl({
                        action: "read",
                        expires: "01-01-2030",
                    });
                    req.url = url;
                    next();
                }
                catch (err) {
                    throw new apiError_1.default(400, "Failed to upload file");
                }
            }));
            blobStream.end(buffer);
        });
    }
    uploadCertificate(folderName, buffer, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = `${rootFolder}/${folderName}/${filename}`;
            const blob = firebase_1.firebaseBucket.file(filePath);
            const blobStream = blob.createWriteStream({
                resumable: false,
                contentType: "application/pdf",
            });
            return new Promise((resolve, reject) => {
                blobStream.on("error", (err) => {
                    reject(err);
                });
                blobStream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const [url] = yield blob.getSignedUrl({
                            action: "read",
                            expires: "01-01-2030",
                        });
                        resolve(url);
                    }
                    catch (err) {
                        reject(err);
                    }
                }));
                blobStream.end(buffer);
            });
        });
    }
    multipleFiles(folderName) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files || !Array.isArray(req.files)) {
                return res.status(400).send("No files uploaded.");
            }
            try {
                const fileUploadPromises = req.files.map((file) => {
                    const { originalname, buffer, mimetype } = file;
                    const filePath = `${rootFolder}/${folderName}/${Date.now()}_${originalname}`;
                    const blob = firebase_1.firebaseBucket.file(filePath);
                    const blobStream = blob.createWriteStream({
                        resumable: false,
                        contentType: mimetype,
                    });
                    return new Promise((resolve, reject) => {
                        blobStream.on("error", (err) => {
                            reject(new apiError_1.default(400, "Failed to blob stream file"));
                        });
                        blobStream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                            try {
                                const [url] = yield blob.getSignedUrl({
                                    action: "read",
                                    expires: "01-01-2030",
                                });
                                resolve(url);
                            }
                            catch (err) {
                                reject(new apiError_1.default(400, "Failed to generate file URL"));
                            }
                        }));
                        blobStream.end(buffer);
                    });
                });
                req.urls = yield Promise.all(fileUploadPromises);
                next();
            }
            catch (error) {
                next(new apiError_1.default(400, "Failed to upload multiple files"));
            }
        });
    }
    deleteSingle(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = (0, extractFilePath_1.default)(url);
            if (filePath) {
                try {
                    const file = firebase_1.firebaseBucket.file(filePath);
                    yield file.delete();
                    return;
                }
                catch (error) {
                    console.log("Error to delete file");
                    return;
                }
            }
            else {
                return;
            }
        });
    }
}
exports.FileUploadMiddleware = new FileUploader();
