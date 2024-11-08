import { Types } from "mongoose";
import RootController from "../../shared/rootController";
import { AssignmentSubmissionService } from "./service";
import { Request, Response } from "express";

class Controller extends RootController {
  submit = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const courseId = req.params.courseId as unknown as Types.ObjectId;
    const moduleId = req.params.moduleId as unknown as Types.ObjectId;
    const lessonId = req.params.lessonId as unknown as Types.ObjectId;
    await AssignmentSubmissionService.submit(
      userId,
      courseId,
      moduleId,
      lessonId,
      req.body
    );
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Assignment submitted successfully",
      data: null,
    });
  });
}

export const AssignmentSubmissionController = new Controller();
