import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { StudentProgressService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createStudentProgress = this.catchAsync(
    async (req: Request, res: Response) => {
      await StudentProgressService.createOrUpdateStudentProgress(req.body);
      this.apiResponse(res, {
        statusCode: 201,
        success: true,
        message: "Student progress created successfully",
        data: null,
      });
    }
  );
  getStudentProgress = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const data = await StudentProgressService.getStudentProgress(userId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student progress retrieved successfully",
      data: data,
    });
  });
  getSingleCourseProgress = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const courseId = req.params.courseId as unknown as Types.ObjectId;
      const data = await StudentProgressService.getSingleCourseProgress(
        userId,
        courseId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course progress retrieved successfully",
        data: data,
      });
    }
  );
  getAllCourseProgress = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const data = await StudentProgressService.getAllCourseProgress(userId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Courses progress retrieved successfully",
        data: data,
      });
    }
  );
  completeLesson = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const moduleId = req.params.moduleId as unknown as Types.ObjectId;
    const lessonId = req.params.lessonId as unknown as Types.ObjectId;
    await StudentProgressService.completeLesson(
      userId,
      courseId,
      moduleId,
      lessonId
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson marked as completed!",
      data: null,
    });
  });
  assignmentLessonMarkAsSubmitted = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const courseId = req.params.courseId as unknown as Types.ObjectId;
      const moduleId = req.params.moduleId as unknown as Types.ObjectId;
      const lessonId = req.params.lessonId as unknown as Types.ObjectId;
      await StudentProgressService.assignmentLessonMarkAsSubmitted(
        userId,
        courseId,
        moduleId,
        lessonId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Assignment lesson marked as submitted!",
        data: null,
      });
    }
  );
  quizLessonMarkAsSubmitted = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const courseId = req.params.courseId as unknown as Types.ObjectId;
      const moduleId = req.params.moduleId as unknown as Types.ObjectId;
      const lessonId = req.params.lessonId as unknown as Types.ObjectId;
      await StudentProgressService.quizLessonMarkAsSubmitted(
        userId,
        courseId,
        moduleId,
        lessonId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quiz lesson marked as submitted!",
        data: null,
      });
    }
  );
}

export const StudentProgressController = new Controller();
