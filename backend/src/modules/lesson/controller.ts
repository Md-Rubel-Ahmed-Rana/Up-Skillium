import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { LessonService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createLesson = this.catchAsync(async (req: Request, res: Response) => {
    await LessonService.createLesson(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Lesson created successfully",
      data: null,
    });
  });
  createVideoLesson = this.catchAsync(async (req: Request, res: Response) => {
    await LessonService.createVideoLesson(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Video lesson created successfully",
      data: null,
    });
  });
  createQuizLesson = this.catchAsync(async (req: Request, res: Response) => {
    await LessonService.createQuizLesson(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quiz lesson created successfully",
      data: null,
    });
  });

  getAllLessons = this.catchAsync(async (req: Request, res: Response) => {
    const { search = "", type, page = 1, limit = 10 } = req.query;
    const lessons = await LessonService.getAllLessons(
      search as string,
      type as "video" | "instruction" | "quiz" | "assignment",
      Number(page),
      Number(limit)
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lessons fetched successfully",
      data: lessons,
    });
  });

  getLessonById = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const lesson = await LessonService.getLessonById(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson fetched successfully",
      data: lesson,
    });
  });

  getLessonByIdWithQuizCorrectAnswer = this.catchAsync(
    async (req: Request, res: Response) => {
      const lessonId = req.params.lessonId as unknown as Types.ObjectId;
      const lesson = await LessonService.getLessonByIdWithQuizCorrectAnswer(
        lessonId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Lesson fetched with quiz correct answer successfully",
        data: lesson,
      });
    }
  );

  updateLesson = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await LessonService.updateLesson(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson updated successfully",
      data: null,
    });
  });
  updateQuizzesInLesson = this.catchAsync(
    async (req: Request, res: Response) => {
      const lessonId = req.params.lessonId as unknown as Types.ObjectId;
      await LessonService.updateQuizzesInLesson(lessonId, req.body);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Lesson quizzes updated successfully",
        data: null,
      });
    }
  );

  deleteLesson = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await LessonService.deleteLesson(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson deleted successfully",
      data: null,
    });
  });

  getLessonsByModule = this.catchAsync(async (req: Request, res: Response) => {
    const { moduleId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const lessons = await LessonService.getLessonsByModule(
      moduleId as unknown as Types.ObjectId,
      Number(page),
      Number(limit)
    );
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lessons for course fetched successfully",
      data: lessons,
    });
  });
  getAllLessonsByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const lessons = await LessonService.getAllLessonsByInstructor(
        instructorId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Lessons retrieved successfully",
        data: lessons,
      });
    }
  );
  getAllQuizLessonsByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const lessons = await LessonService.getAllQuizLessonsByInstructor(
        instructorId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quizzes retrieved successfully",
        data: lessons,
      });
    }
  );
  getAllAssignmentLessonsByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const lessons = await LessonService.getAllAssignmentLessonsByInstructor(
        instructorId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Assignments retrieved successfully",
        data: lessons,
      });
    }
  );
}

export const LessonController = new Controller();
