import { StudentService } from "./service";
import RootController from "../../shared/rootController";
import { Request, Response } from "express";

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
}

export const StudentController = new Controller();
