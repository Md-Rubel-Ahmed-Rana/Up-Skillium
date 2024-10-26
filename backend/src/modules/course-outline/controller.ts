import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { CourseOutlineService } from "./service";

class Controller extends RootController {
  createOutline = this.catchAsync(async (req: Request, res: Response) => {
    await CourseOutlineService.createOutline(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course outline created successful",
      data: null,
    });
  });
  getOutlines = this.catchAsync(async (req: Request, res: Response) => {
    const data = await CourseOutlineService.getOutlines();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outlines fetched successful",
      data: data,
    });
  });
  getOutline = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await CourseOutlineService.getOutline(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successful",
      data: data,
    });
  });
  getOutlineByCourse = this.catchAsync(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const data = await CourseOutlineService.getOutlineByCourse(courseId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successful",
      data: data,
    });
  });
  updateOutline = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await CourseOutlineService.updateOutline(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successful",
      data: null,
    });
  });
  deleteOutline = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await CourseOutlineService.deleteOutline(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course outline fetched successful",
      data: null,
    });
  });
}

export const CourseOutlineController = new Controller();
