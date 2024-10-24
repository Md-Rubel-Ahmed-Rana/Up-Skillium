import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { RoleService } from "./service";

class Controller extends RootController {
  createRole = this.catchAsync(async (req: Request, res: Response) => {
    await RoleService.createRole(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Role created successfully",
      data: null,
    });
  });
  getAllRoles = this.catchAsync(async (req: Request, res: Response) => {
    const data = await RoleService.getAllRoles();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Roles fetched successfully",
      data: data,
    });
  });
  getRoleById = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await RoleService.getRoleById(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role fetched successfully",
      data: data,
    });
  });
  getRoleByRoleName = this.catchAsync(async (req: Request, res: Response) => {
    const role = req.params.role;
    const data = await RoleService.getRoleByRoleName(role);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role fetched successfully",
      data: data,
    });
  });
  updateRole = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await RoleService.updateRole(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role updated successfully",
      data: null,
    });
  });
  deleteRole = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await RoleService.deleteRole(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Role deleted successfully",
      data: null,
    });
  });
}

export const RoleController = new Controller();
