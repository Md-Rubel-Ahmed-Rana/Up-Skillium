import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { CourseOutlineService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createOutline = this.catchAsync(async (req: Request, res: Response) => {
    await CourseOutlineService.createOutline(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course outline created successfully",
      data: null,
    });
  });
  getOutlines = this.catchAsync(async (req: Request, res: Response) => {
    const data = await CourseOutlineService.getOutlines();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outlines fetched successfully",
      data: data,
    });
  });
  getOutline = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await CourseOutlineService.getOutline(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successfully",
      data: data,
    });
  });
  getOutlineByCourse = this.catchAsync(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = await CourseOutlineService.getOutlineByCourse(courseId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successfully",
      data: data,
    });
  });
  updateOutlineModules = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      await CourseOutlineService.updateOutlineModules(id, req.body);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course outline fetched successfully",
        data: null,
      });
    }
  );
  deleteOutline = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await CourseOutlineService.deleteOutline(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successfully",
      data: null,
    });
  });
  updateModuleSerialNumberFromDragDrop = this.catchAsync(
    async (req: Request, res: Response) => {
      const courseId = req.params.courseId as unknown as Types.ObjectId;
      await CourseOutlineService.updateModuleSerialNumberFromDragDrop(
        courseId,
        req.body
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Modules serial updated successfully",
        data: null,
      });
    }
  );
  updateModuleName = this.catchAsync(async (req: Request, res: Response) => {
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const moduleId = req.params.moduleId as unknown as Types.ObjectId;
    await CourseOutlineService.updateModuleName(
      courseId,
      moduleId,
      req.body.name
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module name updated successfully",
      data: null,
    });
  });
  deleteModule = this.catchAsync(async (req: Request, res: Response) => {
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const moduleId = req.params.moduleId as unknown as Types.ObjectId;
    await CourseOutlineService.deleteModule(courseId, moduleId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module deleted successfully",
      data: null,
    });
  });
  getOutlinesByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const data = await CourseOutlineService.getOutlinesByInstructor(
        instructorId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Outlines retrieved successfully",
        data: data,
      });
    }
  );
}

export const CourseOutlineController = new Controller();
