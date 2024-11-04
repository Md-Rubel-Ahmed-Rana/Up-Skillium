import { StudentService } from "./service";
import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { Types } from "mongoose";

class Controller extends RootController {
  createNewStudent = this.catchAsync(async (req: Request, res: Response) => {
    await StudentService.createNewStudent(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Registration successful",
      data: null,
    });
  });
  getMyCourses = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as Types.ObjectId;
    const data = await StudentService.getMyCourses(userId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "My courses retrieved successfully",
      data: data,
    });
  });
}

export const StudentController = new Controller();
