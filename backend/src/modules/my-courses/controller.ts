import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { MyCourseService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
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
  getMySingleCourse = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const course = await MyCourseService.getMySingleCourse(userId, courseId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "My course retrieved successfully",
      data: course,
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
