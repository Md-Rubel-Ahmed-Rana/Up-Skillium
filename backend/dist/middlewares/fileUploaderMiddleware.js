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
    constructor() {
        this.uploadLessonVideo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.file) {
                req.body.videoUrl = yield this.uploadSingleFile("lesson-videos", req.file);
            }
            next();
        });
    }
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
    uploadSingleFile(folderName, file) {
        const { originalname, buffer } = file;
        return new Promise((resolve, reject) => {
            const filePath = `${rootFolder}/${folderName}/${Date.now()}_${originalname}`;
            const blob = firebase_1.firebaseBucket.file(filePath);
            const blobStream = blob.createWriteStream({
                resumable: false,
                contentType: file.mimetype,
            });
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
                    reject(new apiError_1.default(400, "Failed to upload file"));
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
    uploadCourseImageAndIntroVideo() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const parseJSON = (input, defaultValue) => {
                    try {
                        return input ? JSON.parse(input) : defaultValue;
                    }
                    catch (_a) {
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
                    const files = req.files;
                    const imageFile = (_a = files.image) === null || _a === void 0 ? void 0 : _a[0];
                    const videoFile = (_b = files.introductoryVideo) === null || _b === void 0 ? void 0 : _b[0];
                    if (imageFile) {
                        req.body.image = yield this.uploadSingleFile("course-thumbnail-images", imageFile);
                    }
                    if (videoFile) {
                        req.body.introductoryVideo = yield this.uploadSingleFile("course-introductory-videos", videoFile);
                    }
                }
                next();
            }
            catch (err) {
                next(err);
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
