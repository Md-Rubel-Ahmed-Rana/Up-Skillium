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
exports.TrackOrderId = void 0;
const service_1 = require("../modules/enrollment/service");
class OrderId {
    generateOrderId(lastOrder, newCourseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastOrderId = lastOrder ? lastOrder === null || lastOrder === void 0 ? void 0 : lastOrder.orderId : OrderId.defaultOrderId;
            const parts = lastOrderId
                ? lastOrderId.split("-")
                : OrderId.defaultOrderId.split("-");
            const globalOrderId = parts[2];
            const newGlobalOrderId = (parseInt(globalOrderId, 10) + 1)
                .toString()
                .padStart(6, "0");
            const newCourseOrderId = yield this.generateCourseOrderId(lastOrder, newCourseId);
            const incrementedId = `US-OR-${newGlobalOrderId}-${newCourseOrderId}`;
            return incrementedId;
        });
    }
    generateCourseOrderId(lastOrder, newCourseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isSameCourse = (lastOrder === null || lastOrder === void 0 ? void 0 : lastOrder.course.toString()) === newCourseId;
            if (isSameCourse) {
                return yield this.generateNewCourseOrderId(lastOrder);
            }
            else {
                const lastEnrolledCourse = yield service_1.EnrollmentService.getLastEnrollmentByCourseId(newCourseId);
                const lastOrderId = lastEnrolledCourse === null || lastEnrolledCourse === void 0 ? void 0 : lastEnrolledCourse.orderId;
                if (!lastOrderId) {
                    return "0001";
                }
                else {
                    return yield this.generateNewCourseOrderId(lastEnrolledCourse);
                }
            }
        });
    }
    generateNewCourseOrderId(lastOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastOrderId = lastOrder === null || lastOrder === void 0 ? void 0 : lastOrder.orderId;
            const parts = lastOrderId.split("-");
            const courseOrderId = parts[3];
            return (parseInt(courseOrderId, 10) + 1).toString().padStart(4, "0");
        });
    }
}
// US for platform name Up Skillium, OR for Order,
// 000000 for global order count, 0000 for per-course order count
OrderId.defaultOrderId = "US-OR-000000-0000";
exports.TrackOrderId = new OrderId();
