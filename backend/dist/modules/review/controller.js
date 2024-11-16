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
exports.ReviewController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.addReview = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.ReviewService.addReview(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Review added successfully",
                data: null,
            });
        }));
        this.getAllReviews = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.ReviewService.getAllReviews();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Reviews retrieved successfully",
                data: data,
            });
        }));
        this.getSingleReview = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.ReviewService.getSingleReview(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Review retrieved successfully",
                data: data,
            });
        }));
        this.getAllReviewByReviewTo = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const reviewToId = req.params.reviewToId;
            const data = yield service_1.ReviewService.getAllReviewByReviewTo(reviewToId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Reviews retrieved successfully",
                data: data,
            });
        }));
        this.updateReview = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.ReviewService.updateReview(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Review updated successfully",
                data: null,
            });
        }));
        this.deleteReview = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.ReviewService.deleteReview(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Review deleted successfully",
                data: null,
            });
        }));
    }
}
exports.ReviewController = new Controller();
