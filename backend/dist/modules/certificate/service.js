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
const certificate_service_1 = require("../pdf-creator/certificate.service");
const model_1 = require("./model");
const fileUploaderMiddleware_1 = require("../../middlewares/fileUploaderMiddleware");
const service_1 = require("../course/service");
const mail_service_1 = require("../mail/mail.service");
class Service {
    createCertificate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const certificatePdfData = {
                courseName: data === null || data === void 0 ? void 0 : data.courseName,
                studentName: data === null || data === void 0 ? void 0 : data.studentName,
                score: data === null || data === void 0 ? void 0 : data.score,
                technologies: data === null || data === void 0 ? void 0 : data.technologies,
            };
            const certificateUrl = yield certificate_service_1.PdfCreatorService.createCertificate(certificatePdfData);
            const newCertificate = yield model_1.Certificate.create(Object.assign(Object.assign({}, data), { certificateUrl: certificateUrl }));
            const createdCertificate = yield model_1.Certificate.findById(newCertificate._id).populate("user", "email name");
            // send email to student
            yield mail_service_1.MailService.sendGotCertificateMail({
                courseName: data.courseName,
                student: {
                    name: data === null || data === void 0 ? void 0 : data.studentName,
                    email: (_a = createdCertificate === null || createdCertificate === void 0 ? void 0 : createdCertificate.user) === null || _a === void 0 ? void 0 : _a.email,
                },
                certificateLink: certificateUrl,
            });
        });
    }
    getAllCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.Certificate.find({}).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "course",
                    model: "Course",
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
                    select: { password: 0 },
                },
                {
                    path: "course",
                    model: "Course",
                },
            ]);
        });
    }
    getCertificatesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Certificate.find({ user: userId }).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "course",
                    model: "Course",
                },
            ]);
        });
    }
    getCertificatesByInstructor(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseIds = yield service_1.CourseService.getCourseIdsByInstructor(instructorId);
            const certificates = yield model_1.Certificate.find({
                course: { $in: courseIds },
            }).populate([
                {
                    path: "user",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "course",
                    model: "Course",
                },
            ]);
            return certificates;
        });
    }
    getCertificateAnalyticsSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const [summary] = yield model_1.Certificate.aggregate([
                {
                    $facet: {
                        overallStats: [
                            {
                                $group: {
                                    _id: null,
                                    totalCertificates: { $sum: 1 },
                                    averageScore: { $avg: "$score" },
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    totalCertificates: 1,
                                    averageScore: { $round: ["$averageScore", 2] },
                                },
                            },
                        ],
                        topTechnologies: [
                            { $unwind: "$technologies" },
                            {
                                $group: {
                                    _id: "$technologies",
                                    count: { $sum: 1 },
                                },
                            },
                            { $sort: { count: -1 } },
                            { $limit: 5 },
                            {
                                $project: {
                                    _id: 0,
                                    name: "$_id",
                                    count: 1,
                                },
                            },
                        ],
                        topCourses: [
                            {
                                $group: {
                                    _id: "$courseName",
                                    count: { $sum: 1 },
                                },
                            },
                            { $sort: { count: -1 } },
                            { $limit: 5 },
                            {
                                $project: {
                                    _id: 0,
                                    title: "$_id",
                                    count: 1,
                                },
                            },
                        ],
                    },
                },
            ]);
            return {
                totalCertificates: ((_b = (_a = summary === null || summary === void 0 ? void 0 : summary.overallStats) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.totalCertificates) || 0,
                averageScore: ((_d = (_c = summary === null || summary === void 0 ? void 0 : summary.overallStats) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.averageScore) || 0,
                topTechnologies: (summary === null || summary === void 0 ? void 0 : summary.topTechnologies) || [],
                topCourses: (summary === null || summary === void 0 ? void 0 : summary.topCourses) || [],
            };
        });
    }
    updateCertificate(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificate = yield model_1.Certificate.findById(id);
            if (certificate && (certificate === null || certificate === void 0 ? void 0 : certificate.certificateUrl)) {
                yield fileUploaderMiddleware_1.FileUploadMiddleware.deleteSingle(certificate === null || certificate === void 0 ? void 0 : certificate.certificateUrl);
            }
            const certificateUrl = yield certificate_service_1.PdfCreatorService.createCertificate(updateData);
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
