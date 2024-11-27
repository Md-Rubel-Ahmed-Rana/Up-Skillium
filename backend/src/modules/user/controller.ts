import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { UserService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  findUsers = this.catchAsync(async (req: Request, res: Response) => {
    const searchText = (req.query.searchText as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await UserService.findUsers(searchText, page, limit);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users found successfully",
      data: users,
    });
  });
  getSingleUser = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id as unknown as Types.ObjectId;
    const user = await UserService.findUserById(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "User found successfully",
      data: user,
    });
  });
  updateUser = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await UserService.updateUser(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "User updated successfully",
      data: null,
    });
  });
  changePassword = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    await UserService.changePassword(userId, oldPassword, newPassword);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password has been changed successfully",
      data: null,
    });
  });
  updateProfileImage = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await UserService.updateProfileImage(id, req.url);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile picture changed successfully",
      data: null,
    });
  });
  updateUserBasicInfo = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await UserService.updateUserBasicInfo(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "User basic info updated successfully",
      data: null,
    });
  });
  updateUserAddress = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await UserService.updateUserAddress(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Address updated successfully",
      data: null,
    });
  });
  updateEmergencyContact = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as unknown as Types.ObjectId;
      await UserService.updateEmergencyContact(id, req.body);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Emergency contact updated successfully",
        data: null,
      });
    }
  );
  activeOrInactiveAccount = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as unknown as Types.ObjectId;
      const status = req.params?.status as string;
      await UserService.activeOrInactiveAccount(id, status);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: `User account has been ${status} successfully!`,
        data: null,
      });
    }
  );
}

export const UserController = new Controller();
