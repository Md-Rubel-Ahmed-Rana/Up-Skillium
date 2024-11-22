import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { AssignmentService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  getAllAssignments = this.catchAsync(async (req: Request, res: Response) => {
    const data = await AssignmentService.getAllAssignments();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignments retrieved successfully",
      data: data,
    });
  });
  getSingleAssignment = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const data = await AssignmentService.getSingleAssignment(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment retrieved successfully",
      data: data,
    });
  });
  updateAssignment = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await AssignmentService.updateAssignment(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment updated successfully",
      data: null,
    });
  });
  deleteAssignment = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await AssignmentService.deleteAssignment(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Assignment deleted successfully",
      data: null,
    });
  });
}

export const AssignmentController = new Controller();
