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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const service_1 = require("../pdf-creator/service");
const model_1 = require("./model");
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
class Service {
    createCertificate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificatePdfData = {
                courseName: data === null || data === void 0 ? void 0 : data.courseName,
                studentName: data === null || data === void 0 ? void 0 : data.studentName,
                score: data === null || data === void 0 ? void 0 : data.score,
                technologies: data === null || data === void 0 ? void 0 : data.technologies,
            };
            const certificateUrl = yield service_1.PdfCreatorService.createCertificate(certificatePdfData);
            yield model_1.Certificate.create(Object.assign(Object.assign({}, data), { certificateUrl: certificateUrl }));
        });
    }
    getAllCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.Certificate.find({}).populate([
                {
                    path: "user",
                    model: "User",
                    select: { name: 1, image: 1, email: 1 },
                },
                {
                    path: "course",
                    model: "Course",
                    select: { title: 1, category: 1, image: 1 },
                },
            ]);
            return data;
        });
    }
    getSingleCertificate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Certificate.findById(id).populate([
                {
                    path: "user",
                    model: "User",
                    select: { name: 1, image: 1, email: 1 },
                },
                {
                    path: "course",
                    model: "Course",
                    select: { title: 1, category: 1, image: 1 },
                },
            ]);
        });
    }
    getCertificatesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Certificate.find({ user: userId }).populate("course", "title");
        });
    }
    updateCertificate(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificate = yield model_1.Certificate.findById(id);
            if (certificate && (certificate === null || certificate === void 0 ? void 0 : certificate.certificateUrl)) {
                yield fileUploaderMiddleware_1.FileUploadMiddleware.deleteSingle(certificate === null || certificate === void 0 ? void 0 : certificate.certificateUrl);
            }
            const certificateUrl = yield service_1.PdfCreatorService.createCertificate(updateData);
            yield model_1.Certificate.findByIdAndUpdate(id, {
                certificateUrl: certificateUrl,
            });
        });
    }
    deleteCertificate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificate = yield model_1.Certificate.findById(id);
            if (certificate && (certificate === null || certificate === void 0 ? void 0 : certificate.certificateUrl)) {
                yield fileUploaderMiddleware_1.FileUploadMiddleware.deleteSingle(certificate === null || certificate === void 0 ? void 0 : certificate.certificateUrl);
            }
            yield model_1.Certificate.findByIdAndDelete(id);
        });
    }
}
exports.CertificateService = new Service();
