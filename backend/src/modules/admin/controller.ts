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
  getAllAdmins = this.catchAsync(async (req: Request, res: Response) => {
    const data = await AdminService.getAllAdmins();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins retrieved successfully",
      data: data,
    });
  });
}

export const AdminController = new Controller();
