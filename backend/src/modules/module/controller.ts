import { Types } from "mongoose";
import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { ModuleService } from "./service";

class Controller extends RootController {
  createNewModule = this.catchAsync(async (req: Request, res: Response) => {
    await ModuleService.createNewModule(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Module created successfully",
      data: null,
    });
  });
  getAllModules = this.catchAsync(async (req: Request, res: Response) => {
    const searchText = (req.query.searchText as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const courseId = req.query.courseId as string;
    const data = await ModuleService.getAllModules(
      searchText,
      page,
      limit,
      courseId
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Modules fetched successfully",
      data: data,
    });
  });
  getSingleModule = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const data = await ModuleService.getSingleModule(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module fetched successfully",
      data: data,
    });
  });
  getModuleByCourseId = this.catchAsync(async (req: Request, res: Response) => {
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const data = await ModuleService.getModuleByCourseId(courseId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Modules fetched successfully",
      data: data,
    });
  });
  getFullClassByCourseId = this.catchAsync(
    async (req: Request, res: Response) => {
      const courseId = req.params.courseId as unknown as Types.ObjectId;
      const data = await ModuleService.getFullClassByCourseId(courseId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Classes fetched successfully",
        data: data,
      });
    }
  );
  updateModule = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await ModuleService.updateModule(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module updated successfully",
      data: null,
    });
  });
  deleteModule = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await ModuleService.deleteModule(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module deleted successfully",
      data: null,
    });
  });
  getAllModulesByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const data = await ModuleService.getAllModulesByInstructor(instructorId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Modules retrieved successfully",
        data: data,
      });
    }
  );
}

export const ModuleController = new Controller();
