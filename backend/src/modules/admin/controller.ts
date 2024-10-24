import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { AdminService } from "./service";

class Controller extends RootController {
  createNewAdmin = this.catchAsync(async (req: Request, res: Response) => {
    await AdminService.createNewAdmin(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin added successfully",
      data: null,
    });
  });
}

export const AdminController = new Controller();
