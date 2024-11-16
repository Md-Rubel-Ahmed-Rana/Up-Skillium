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
exports.CertificateController = void 0;
const rootController_1 = __importDefault(require("../../shared/rootController"));
const service_1 = require("./service");
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createCertificate = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("From certificate controller", req.body);
            yield service_1.CertificateService.createCertificate(req.body);
            this.apiResponse(res, {
                statusCode: 201,
                success: true,
                message: "Certificate created successfully",
                data: null,
            });
        }));
        this.getAllCertificate = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield service_1.CertificateService.getAllCertificate();
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Certificates fetched successfully",
                data: data,
            });
        }));
        this.getSingleCertificate = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield service_1.CertificateService.getSingleCertificate(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Certificate fetched successfully",
                data: data,
            });
        }));
        this.getCertificatesByUserId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const data = yield service_1.CertificateService.getCertificatesByUserId(userId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Certificates retrieved successfully",
                data: data,
            });
        }));
        this.updateCertificate = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CertificateService.updateCertificate(id, req.body);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Certificate updated successfully",
                data: null,
            });
        }));
        this.deleteCertificate = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield service_1.CertificateService.deleteCertificate(id);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Certificate deleted successfully",
                data: null,
            });
        }));
    }
}
exports.CertificateController = new Controller();
