import RootController from "../../shared/rootController";
import { Request, Response } from "express";
import { EducationService } from "./service";

class Controller extends RootController {
  addEducation = this.catchAsync(async (req: Request, res: Response) => {
    await EducationService.addEducation(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Education added successfully",
      data: null,
    });
  });
  getEducations = this.catchAsync(async (req: Request, res: Response) => {
    const data = await EducationService.getEducations();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Educations fetched successfully",
      data: data,
    });
  });
  getEducation = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await EducationService.getEducation(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Education fetched successfully",
      data: data,
    });
  });
  getEducationsByUserId = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId;
      const data = await EducationService.getEducationsByUserId(userId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Educations fetched successfully",
        data: data,
      });
    }
  );
  updateEducation = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await EducationService.updateEducation(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Education updated successfully",
      data: null,
    });
  });
  deleteEducation = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await EducationService.deleteEducation(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Education deleted successfully",
      data: null,
    });
  });
}

export const EducationController = new Controller();
