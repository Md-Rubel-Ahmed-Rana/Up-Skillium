import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { InstructorService } from "./service";

class Controller extends RootController {
  createNewInstructor = this.catchAsync(async (req: Request, res: Response) => {
    await InstructorService.createNewInstructor(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Instructor added successfully",
      data: null,
    });
  });
  getAllInstructors = this.catchAsync(async (req: Request, res: Response) => {
    const data = await InstructorService.getAllInstructors();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Instructors retrieved successfully",
      data: data,
    });
  });
}

export const InstructorController = new Controller();
