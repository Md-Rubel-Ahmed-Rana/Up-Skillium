import { Types } from "mongoose";
import RootController from "../../shared/rootController";
import { AssignmentSubmissionService } from "./service";
import { Request, Response } from "express";

class Controller extends RootController {
  submit = this.catchAsync(async (req: Request, res: Response) => {
    await AssignmentSubmissionService.submit(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Assignment submitted successfully",
      data: null,
    });
  });
  getAllSubmission = this.catchAsync(async (req: Request, res: Response) => {
    const data = await AssignmentSubmissionService.getAllSubmission();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment submissions retrieved successfully",
      data: data,
    });
  });
  getAllPendingSubmissions = this.catchAsync(
    async (req: Request, res: Response) => {
      const data = await AssignmentSubmissionService.getAllPendingSubmissions();
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Pending submissions retrieved successfully",
        data: data,
      });
    }
  );
  getAllReviewedSubmissions = this.catchAsync(
    async (req: Request, res: Response) => {
      const data =
        await AssignmentSubmissionService.getAllReviewedSubmissions();
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reviewed submissions retrieved successfully",
        data: data,
      });
    }
  );
  getAssignmentSubmissionByLessonId = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const lessonId = req.params.lessonId as unknown as Types.ObjectId;
      const data =
        await AssignmentSubmissionService.getAssignmentSubmissionByLessonId(
          userId,
          lessonId
        );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Assignment submission retrieved successfully",
        data: data,
      });
    }
  );
  updateAssignmentReview = this.catchAsync(
    async (req: Request, res: Response) => {
      await AssignmentSubmissionService.updateAssignmentReview(req.body);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Assignment reviewed retrieved successfully",
        data: null,
      });
    }
  );
  updateSubmission = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await AssignmentSubmissionService.updateSubmission(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment reviewed retrieved successfully",
      data: null,
    });
  });
  getPendingAssignmentByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const data =
        await AssignmentSubmissionService.getPendingAssignmentByInstructor(
          instructorId
        );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Pending assignments retrieved successfully",
        data: data,
      });
    }
  );
  getCompletedAssignmentByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const data =
        await AssignmentSubmissionService.getCompletedAssignmentByInstructor(
          instructorId
        );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Completed assignments retrieved successfully",
        data: data,
      });
    }
  );
}

export const AssignmentSubmissionController = new Controller();
