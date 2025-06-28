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
exports.CartService = void 0;
const mongoose_1 = require("mongoose");
const service_1 = require("../stripe-payment/service");
const model_1 = require("./model");
class Service {
    addToCart(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Cart.create(data);
        });
    }
    getAllCart() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Cart.find({}).populate("user", "-password").populate("course");
        });
    }
    getUserCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Cart.find({ user: userId }).populate("course");
        });
    }
    removeFromCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model_1.Cart.findByIdAndDelete(cartId);
        });
    }
    checkout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItems = yield model_1.Cart.find({ user: userId }).populate("course");
            if (!cartItems.length) {
                throw new Error("Cart is empty");
            }
            const payload = cartItems.map((item) => {
                const course = item.course;
                return {
                    userId: new mongoose_1.Types.ObjectId(userId),
                    courseId: course._id,
                    courseName: course.title,
                    price: course.price.salePrice,
                    quantity: 1,
                };
            });
            const { url } = yield service_1.StripePaymentService.checkoutFromCart(payload);
            yield model_1.Cart.deleteMany({ user: userId });
            return { url };
        });
    }
}
exports.CartService = new Service();
