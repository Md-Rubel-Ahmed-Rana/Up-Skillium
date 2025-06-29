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
exports.EnrollmentService = void 0;
const model_1 = require("./model");
const trackOrderId_1 = require("../../utils/trackOrderId");
const invoice_service_1 = require("../pdf-creator/invoice.service");
const mail_service_1 = require("../mail/mail.service");
const service_1 = require("../my-courses/service");
const apiError_1 = __importDefault(require("../../shared/apiError"));
const service_2 = require("../course/service");
class Service {
    createEnrollment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isExist(data.user, data.course);
            const lastEnrollment = yield model_1.Enrollment.findOne().sort({ _id: -1 });
            const newOrderId = yield trackOrderId_1.TrackOrderId.generateOrderId(lastEnrollment, data.course.toString());
            yield model_1.Enrollment.create(Object.assign(Object.assign({}, data), { orderId: newOrderId }));
        });
    }
    createManyEnrollment(enrollments) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastEnrollment = yield model_1.Enrollment.findOne().sort({ _id: -1 });
            for (const enrollment of enrollments) {
                const newOrderId = yield trackOrderId_1.TrackOrderId.generateOrderId(lastEnrollment, enrollment.course.toString());
                yield model_1.Enrollment.create(Object.assign(Object.assign({}, enrollment), { orderId: newOrderId }));
            }
        });
    }
    isExist(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield model_1.Enrollment.findOne({
                user: userId,
                course: courseId,
                status: "success",
            });
            if (isExist) {
                throw new apiError_1.default(400, "You already have enrolled to this course!");
            }
        });
    }
    getEnrollmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Enrollment.findById(id)
                .populate("user", "-password")
                .populate("course");
        });
    }
    getLastEnrollmentByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastEnrolledCourse = yield model_1.Enrollment.findOne({
                course: courseId,
            }).sort({ _id: -1 });
            return lastEnrolledCourse;
        });
    }
    updateEnrollment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Enrollment.findByIdAndUpdate(id, data);
        });
    }
    getSuccessEnrollmentForStudent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.Enrollment.find({ user: userId, status: "success" })
                .populate("user", "-password")
                .populate("course");
            return data;
        });
    }
    getOrderEnrollmentHistoryForStudent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.Enrollment.find({ user: userId })
                .populate("user", "-password")
                .populate("course");
            return data;
        });
    }
    updateStatusAsSuccessByWebhook(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const enrollment = yield model_1.Enrollment.findOne({
                paymentSessionId: sessionId,
            })
                .populate("user", "-password")
                .populate("course");
            if (enrollment) {
                // generate PDF invoice here
                const invoiceUrl = yield invoice_service_1.InvoiceService.createInvoice({
                    courseInfo: {
                        name: enrollment.course.title,
                        price: enrollment.course.price.salePrice,
                        discount: enrollment.course.price.discount,
                    },
                    customerInfo: {
                        name: enrollment.user.name,
                        email: enrollment.user.email,
                        studentId: (_a = enrollment === null || enrollment === void 0 ? void 0 : enrollment.user) === null || _a === void 0 ? void 0 : _a.userRoleId,
                    },
                    orderInfo: {
                        orderId: enrollment.orderId,
                    },
                });
                yield model_1.Enrollment.updateOne({ paymentSessionId: sessionId }, { $set: { status: "success", invoice: invoiceUrl } });
                yield service_1.MyCourseService.addNewCourse({
                    course: enrollment.course.id,
                    user: enrollment.user._id,
                });
                yield service_2.CourseService.addStudentToCourse((_b = enrollment === null || enrollment === void 0 ? void 0 : enrollment.course) === null || _b === void 0 ? void 0 : _b.id, (_c = enrollment === null || enrollment === void 0 ? void 0 : enrollment.user) === null || _c === void 0 ? void 0 : _c._id);
                yield mail_service_1.MailService.enrollmentConfirmationMail(enrollment.user.email, enrollment.user.name, enrollment.course.title, invoiceUrl);
            }
        });
    }
    updateCartEnrollmentsWebhook(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const enrollments = yield model_1.Enrollment.find({
                paymentSessionId: sessionId,
            })
                .populate("user", "-password")
                .populate("course");
            console.log({ from: "updateCartEnrollmentsWebhook", enrollments });
            for (const enrollment of enrollments) {
                if (enrollment) {
                    try {
                        const invoiceUrl = yield invoice_service_1.InvoiceService.createInvoice({
                            courseInfo: {
                                name: enrollment.course.title,
                                price: enrollment.course.price.salePrice,
                                discount: enrollment.course.price.discount,
                            },
                            customerInfo: {
                                name: enrollment.user.name,
                                email: enrollment.user.email,
                                studentId: (_a = enrollment === null || enrollment === void 0 ? void 0 : enrollment.user) === null || _a === void 0 ? void 0 : _a.userRoleId,
                            },
                            orderInfo: {
                                orderId: enrollment.orderId,
                            },
                        });
                        yield model_1.Enrollment.findByIdAndUpdate(enrollment._id, {
                            $set: {
                                status: "success",
                                invoice: invoiceUrl,
                            },
                        });
                        yield service_1.MyCourseService.addNewCourse({
                            course: enrollment.course.id,
                            user: enrollment.user._id,
                        });
                        yield service_2.CourseService.addStudentToCourse((_b = enrollment === null || enrollment === void 0 ? void 0 : enrollment.course) === null || _b === void 0 ? void 0 : _b.id, (_c = enrollment === null || enrollment === void 0 ? void 0 : enrollment.user) === null || _c === void 0 ? void 0 : _c._id);
                        yield mail_service_1.MailService.enrollmentConfirmationMail(enrollment.user.email, enrollment.user.name, enrollment.course.title, invoiceUrl);
                    }
                    catch (error) {
                        console.error(`Error processing enrollment ${enrollment._id}`, error);
                    }
                }
            }
        });
    }
    deleteEnrollment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Enrollment.findByIdAndDelete(id);
        });
    }
    getAllOrderHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollments = yield model_1.Enrollment.find({})
                .populate("user", "-password")
                .populate("course");
            return enrollments;
        });
    }
    getAllSuccessEnrollments() {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollments = yield model_1.Enrollment.find({ status: "success" })
                .populate("user", "-password")
                .populate("course");
            return enrollments;
        });
    }
    searchEnrollments(searchQuery_1) {
        return __awaiter(this, arguments, void 0, function* (searchQuery, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const filter = {
                $or: [
                    { "user.name": { $regex: searchQuery, $options: "i" } },
                    { courseName: { $regex: searchQuery, $options: "i" } },
                ],
            };
            const enrollments = yield model_1.Enrollment.find(filter)
                .populate("user", "-password")
                .populate("course")
                .skip(skip)
                .limit(limit);
            return enrollments;
        });
    }
    getEnrollmentAnalyticsSummary(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { startDate, endDate } = params;
            const match = {};
            if (startDate || endDate) {
                match.createdAt = {};
                if (startDate)
                    match.createdAt.$gte = new Date(startDate);
                if (endDate)
                    match.createdAt.$lte = new Date(endDate);
            }
            const summary = yield model_1.Enrollment.aggregate([
                { $match: match },
                {
                    $facet: {
                        totalEnrollments: [{ $count: "count" }],
                        successCount: [
                            { $match: { status: "success" } },
                            { $count: "count" },
                        ],
                        failedCount: [{ $match: { status: "failed" } }, { $count: "count" }],
                        totalRevenue: [
                            { $match: { status: "success" } },
                            {
                                $group: {
                                    _id: null,
                                    total: { $sum: "$price" },
                                },
                            },
                        ],
                        enrollmentsByDate: [
                            { $match: { status: "success" } },
                            {
                                $group: {
                                    _id: {
                                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                                    },
                                    count: { $sum: 1 },
                                    revenue: { $sum: "$price" },
                                },
                            },
                            { $project: { _id: 0, date: "$_id", count: 1, revenue: 1 } },
                            { $sort: { date: 1 } },
                        ],
                    },
                },
            ]);
            const result = summary[0];
            return {
                totalEnrollments: ((_a = result.totalEnrollments[0]) === null || _a === void 0 ? void 0 : _a.count) || 0,
                successCount: ((_b = result.successCount[0]) === null || _b === void 0 ? void 0 : _b.count) || 0,
                failedCount: ((_c = result.failedCount[0]) === null || _c === void 0 ? void 0 : _c.count) || 0,
                totalRevenue: ((_d = result.totalRevenue[0]) === null || _d === void 0 ? void 0 : _d.total) || 0,
                enrollmentsByDate: result.enrollmentsByDate || [],
            };
        });
    }
}
exports.EnrollmentService = new Service();
