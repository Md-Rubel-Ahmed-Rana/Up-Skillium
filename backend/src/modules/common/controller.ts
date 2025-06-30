import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { CommonService } from "./service";

class Controller extends RootController {
  getTotalDocumentCount = this.catchAsync(
    async (req: Request, res: Response) => {
      const data = await CommonService.getTotalDocumentCount();
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Total document count retrieved successfully",
        data,
      });
    }
  );
}

export const CommonController = new Controller();
