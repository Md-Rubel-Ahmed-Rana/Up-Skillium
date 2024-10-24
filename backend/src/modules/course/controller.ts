import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { CourseService } from "./service";

class Controller extends RootController {
  createCourse = this.catchAsync(async (req: Request, res: Response) => {
    await CourseService.createCourse(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created successfully",
      data: null,
    });
  });
}

export const CourseController = new Controller();
