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
exports.EnrollmentService = void 0;
const service_1 = require("../student-progress/service");
const model_1 = require("./model");
const service_2 = require("../student/service");
const trackOrderId_1 = require("../../utils/trackOrderId");
const invoice_service_1 = require("../pdf-creator/invoice.service");
class Service {
    createEnrollment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastEnrollment = yield model_1.Enrollment.findOne().sort({ _id: -1 });
            const newOrderId = yield trackOrderId_1.TrackOrderId.generateOrderId(lastEnrollment, data.course.toString());
            yield model_1.Enrollment.create(Object.assign(Object.assign({}, data), { orderId: newOrderId, paymentSessionUrl: "this is a dummy url", paymentSessionId: "this is a dummy session id" }));
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
                        studentId: yield service_2.StudentService.getStudentIdByUserId(enrollment.user._id),
                    },
                    orderInfo: {
                        orderId: enrollment.orderId,
                    },
                });
                yield model_1.Enrollment.updateOne({ paymentSessionId: sessionId }, { $set: { status: "success", invoice: invoiceUrl } });
                yield service_1.StudentProgressService.createOrUpdateStudentProgress({
                    userId: enrollment === null || enrollment === void 0 ? void 0 : enrollment.user,
                    courseId: enrollment === null || enrollment === void 0 ? void 0 : enrollment.course,
                });
                yield service_2.StudentService.addNewCourse(enrollment === null || enrollment === void 0 ? void 0 : enrollment.user, enrollment === null || enrollment === void 0 ? void 0 : enrollment.course);
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
}
exports.EnrollmentService = new Service();
