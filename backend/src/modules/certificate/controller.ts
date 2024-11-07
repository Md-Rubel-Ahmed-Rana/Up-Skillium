import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { CertificateService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createCertificate = this.catchAsync(async (req: Request, res: Response) => {
    await CertificateService.createCertificate(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Certificate created successfully",
      data: null,
    });
  });
  getAllCertificate = this.catchAsync(async (req: Request, res: Response) => {
    const data = await CertificateService.getAllCertificate();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Certificates fetched successfully",
      data: data,
    });
  });
  getSingleCertificate = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as unknown as Types.ObjectId;
      const data = await CertificateService.getSingleCertificate(id);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Certificate fetched successfully",
        data: data,
      });
    }
  );
  updateCertificate = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await CertificateService.updateCertificate(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Certificate updated successfully",
      data: null,
    });
  });
  deleteCertificate = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await CertificateService.deleteCertificate(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Certificate deleted successfully",
      data: null,
    });
  });
}

export const CertificateController = new Controller();