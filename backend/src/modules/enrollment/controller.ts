import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { EnrollmentService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createEnrollment = this.catchAsync(async (req: Request, res: Response) => {
    await EnrollmentService.createEnrollment(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Enrollment created successfully",
      data: null,
    });
  });

  getEnrollmentById = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const enrollment = await EnrollmentService.getEnrollmentById(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrollment retrieved successfully",
      data: enrollment,
    });
  });
  getSuccessEnrollmentForStudent = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const enrollment = await EnrollmentService.getSuccessEnrollmentForStudent(
        userId
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Enrollments retrieved successfully",
        data: enrollment,
      });
    }
  );
  getOrderEnrollmentHistoryForStudent = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId as unknown as Types.ObjectId;
      const enrollment =
        await EnrollmentService.getOrderEnrollmentHistoryForStudent(userId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Order history retrieved successfully",
        data: enrollment,
      });
    }
  );

  updateEnrollment = this.catchAsync(async (req: Request, res: Response) => {
    await EnrollmentService.updateEnrollment(req.params.id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrollment updated successfully",
      data: null,
    });
  });

  deleteEnrollment = this.catchAsync(async (req: Request, res: Response) => {
    await EnrollmentService.deleteEnrollment(req.params.id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrollment deleted successfully",
      data: null,
    });
  });

  getEnrollments = this.catchAsync(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      sortBy = "enrollmentDate",
      order = -1,
    } = req.query;
    const filter = req.body.filter || {};

    const sort: Record<string, 1 | -1> = {
      [sortBy as string]: (order === "asc" ? 1 : -1) as 1 | -1,
    };

    const result = await EnrollmentService.getEnrollments(
      filter,
      +page,
      +limit,
      sort
    );

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Enrollments retrieved successfully",
      data: result,
    });
  });

  searchEnrollments = this.catchAsync(async (req: Request, res: Response) => {
    const { searchQuery = "", page = 1, limit = 10 } = req.query;

    const result = await EnrollmentService.searchEnrollments(
      searchQuery as string,
      +page,
      +limit
    );

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Search results retrieved successfully",
      data: result,
    });
  });
}

export const EnrollmentController = new Controller();
