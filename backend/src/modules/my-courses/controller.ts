import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { MyCourseService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  addNewCourse = this.catchAsync(async (req: Request, res: Response) => {
    await MyCourseService.addNewCourse(req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "New course added successfully",
      data: null,
    });
  });

  getMyCourses = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const courses = await MyCourseService.getMyCourses(userId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "My courses retrieved successfully",
      data: courses,
    });
  });

  completeLesson = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const lessonId = req.params.lessonId as unknown as Types.ObjectId;
    await MyCourseService.completeLesson(userId, courseId, lessonId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson marked as completed",
      data: null,
    });
  });
}

export const MyCourseController = new Controller();
