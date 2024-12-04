import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { QuizSubmissionService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  getSubmittedQuizResultByLessonId = this.catchAsync(
    async (req: Request, res: Response) => {
      const lessonId = req.params.lessonId as unknown as Types.ObjectId;
      const data = await QuizSubmissionService.getSubmittedQuizResultByLessonId(
        lessonId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quiz result retrieved successfully",
        data: data,
      });
    }
  );
  submitQuiz = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const moduleId = req.params.moduleId as unknown as Types.ObjectId;
    const lessonId = req.params.lessonId as unknown as Types.ObjectId;
    const data = await QuizSubmissionService.submitQuiz(
      userId,
      courseId,
      moduleId,
      lessonId,
      req.body
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz submitted successfully",
      data: data,
    });
  });
  getAllQuizSubmissions = this.catchAsync(
    async (req: Request, res: Response) => {
      const data = await QuizSubmissionService.getAllQuizSubmissions();
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quiz submissions retrieved successfully",
        data: data,
      });
    }
  );
}

export const QuizSubmissionController = new Controller();
