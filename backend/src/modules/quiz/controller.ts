import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { QuizService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createQuiz = this.catchAsync(async (req: Request, res: Response) => {
    await QuizService.createQuiz(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz created successfully",
      data: null,
    });
  });

  getAllQuizzes = this.catchAsync(async (req: Request, res: Response) => {
    const { search = "", moduleId, page = 1, limit = 10 } = req.query;
    const quizzes = await QuizService.getAllQuizzes(
      search as string,
      moduleId ? new Types.ObjectId(moduleId as string) : undefined,
      Number(page),
      Number(limit)
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quizzes fetched successfully",
      data: quizzes,
    });
  });

  getQuizzesByModuleId = this.catchAsync(
    async (req: Request, res: Response) => {
      const { moduleId } = req.params;
      const quizzes = await QuizService.getQuizzesByModuleId(
        new Types.ObjectId(moduleId)
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quizzes fetched successfully by module ID",
        data: quizzes,
      });
    }
  );

  getSingleQuiz = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = await QuizService.getSingleQuiz(new Types.ObjectId(id));
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single quiz fetched successfully",
      data: quiz,
    });
  });

  updateQuiz = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await QuizService.updateQuiz(new Types.ObjectId(id), req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz updated successfully",
      data: null,
    });
  });

  deleteQuiz = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await QuizService.deleteQuiz(new Types.ObjectId(id));
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quiz deleted successfully",
      data: null,
    });
  });
}

export const QuizController = new Controller();
