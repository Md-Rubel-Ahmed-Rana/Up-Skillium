import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { CertificateService } from "./service";

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
}

export const CertificateController = new Controller();
