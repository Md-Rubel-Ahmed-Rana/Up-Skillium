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
exports.ReviewService = void 0;
const model_1 = require("./model");
const service_1 = require("../course/service");
const service_2 = require("../instructor/service");
class Service {
    addReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Review.create(data);
            if ((data === null || data === void 0 ? void 0 : data.reviewToModel) === "User") {
                yield service_2.InstructorService.incrementRatings(data === null || data === void 0 ? void 0 : data.reviewTo, data === null || data === void 0 ? void 0 : data.rating);
            }
            else if ((data === null || data === void 0 ? void 0 : data.reviewToModel) === "Course") {
                yield service_1.CourseService.incrementRatings(data === null || data === void 0 ? void 0 : data.reviewTo, data === null || data === void 0 ? void 0 : data.rating);
            }
            else {
                return;
            }
        });
    }
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield model_1.Review.find({}).populate([
                {
                    path: "reviewer",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "reviewTo",
                    select: { password: 0 },
                },
            ]);
            return reviews;
        });
    }
    getAllCourseReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield model_1.Review.find({ reviewToModel: "Course" }).populate([
                {
                    path: "reviewer",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "reviewTo",
                    select: { password: 0 },
                },
            ]);
            return reviews;
        });
    }
    getAllInstructorReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield model_1.Review.find({ reviewToModel: "User" }).populate([
                {
                    path: "reviewer",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "reviewTo",
                    select: { password: 0 },
                },
            ]);
            return reviews;
        });
    }
    getSingleReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Review.findById(reviewId).populate([
                {
                    path: "reviewer",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "reviewTo",
                    select: { password: 0 },
                },
            ]);
        });
    }
    getAllReviewByReviewTo(reviewToId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const reviews = yield model_1.Review.find({ reviewTo: reviewToId })
                .populate([
                {
                    path: "reviewer",
                    model: "User",
                    select: { password: 0 },
                },
                {
                    path: "reviewTo",
                    select: { password: 0 },
                },
            ])
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = yield model_1.Review.countDocuments({ reviewTo: reviewToId });
            return { reviews, totalReviews: total };
        });
    }
    updateReview(reviewId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Review.findByIdAndUpdate(reviewId, {
                $set: { feedback: data === null || data === void 0 ? void 0 : data.feedback, rating: data === null || data === void 0 ? void 0 : data.rating },
            });
        });
    }
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Review.findByIdAndDelete(reviewId);
        });
    }
}
exports.ReviewService = new Service();
