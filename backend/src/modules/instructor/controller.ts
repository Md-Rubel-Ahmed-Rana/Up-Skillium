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
}

export const InstructorController = new Controller();
