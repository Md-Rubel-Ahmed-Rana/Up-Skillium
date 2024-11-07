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
}

export const QuizSubmissionController = new Controller();
