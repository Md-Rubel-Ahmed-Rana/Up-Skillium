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
exports.StripePaymentController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.checkout = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield service_1.StripePaymentService.checkout(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }));
        this.webhook = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.StripePaymentService.webHook(req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Event triggered from Webhook successfully",
                data: { received: true },
            });
        }));
    }
}
exports.StripePaymentController = new Controller();
