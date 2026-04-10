import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { CategoryService } from "./service";

class Controller extends RootController {
  createCategory = this.catchAsync(async (req: Request, res: Response) => {
    await CategoryService.createCategory(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: null,
    });
  });
  getCategories = this.catchAsync(async (req: Request, res: Response) => {
    const data = await CategoryService.getCategories();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories fetched successfully",
      data: data,
    });
  });
  updateCategories = this.catchAsync(async (req: Request, res: Response) => {
    await CategoryService.updateCategories(req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories updated successfully",
      data: null,
    });
  });
  deleteCategories = this.catchAsync(async (req: Request, res: Response) => {
    await CategoryService.deleteCategories(req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories deleted successfully",
      data: null,
    });
  });
}

export const CategoryController = new Controller();
