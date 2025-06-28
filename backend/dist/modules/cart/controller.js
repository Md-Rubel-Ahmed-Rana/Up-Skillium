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
exports.CartController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.addToCart = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.CartService.addToCart(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Course added to cart successfully",
                data: null,
            });
        }));
        this.getAllCart = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.CartService.getAllCart();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Carts retrieved successfully",
                data,
            });
        }));
        this.getUserCart = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const data = yield service_1.CartService.getUserCart(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Carts retrieved successfully",
                data,
            });
        }));
        this.removeFromCart = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const cartId = req.params.cartId;
            const data = yield service_1.CartService.removeFromCart(cartId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Course removed from cart successfully",
                data,
            });
        }));
        this.checkout = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            const data = yield service_1.CartService.checkout(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Checkout successful. Courses enrolled.",
                data,
            });
        }));
    }
}
exports.CartController = new Controller();
