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
exports.StripePaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const service_1 = require("../enrollment/service");
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class Service {
    stripeCheckout(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedData = items.map((item) => {
                if (item === null || item === void 0 ? void 0 : item.quantity) {
                    item.quantity = item.quantity >= 1 ? item.quantity : 1;
                }
                else {
                    item.quantity = 1;
                }
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.courseName,
                        },
                        unit_amount: (item === null || item === void 0 ? void 0 : item.price) * 100,
                    },
                    quantity: item.quantity,
                };
            });
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: storedData,
                success_url: envConfig_1.default.stripe.successUrl,
                cancel_url: envConfig_1.default.stripe.cancelUrl,
            });
            return { sessionId: session === null || session === void 0 ? void 0 : session.id, sessionUrl: session.url };
        });
    }
    checkout(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sessionId, sessionUrl } = yield this.stripeCheckout(items);
            const enrollmentData = items.map((item) => ({
                user: item === null || item === void 0 ? void 0 : item.userId,
                course: item === null || item === void 0 ? void 0 : item.courseId,
                courseName: item === null || item === void 0 ? void 0 : item.courseName,
                price: item === null || item === void 0 ? void 0 : item.price,
                paymentSessionId: sessionId,
                paymentSessionUrl: sessionUrl,
            }));
            yield service_1.EnrollmentService.createEnrollment(enrollmentData);
            return { url: sessionUrl };
        });
    }
    makePaymentStatusSuccess(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.EnrollmentService.updateStatusAsSuccessByWebhook(sessionId);
        });
    }
    webHook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (event.type) {
                case "checkout.session.completed":
                    const payment = event.data.object;
                    const sessionId = payment === null || payment === void 0 ? void 0 : payment.id;
                    yield this.makePaymentStatusSuccess(sessionId);
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
        });
    }
}
exports.StripePaymentService = new Service();
