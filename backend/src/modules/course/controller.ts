import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { CourseService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  createCourse = this.catchAsync(async (req: Request, res: Response) => {
    await CourseService.createCourse(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created successfully",
      data: null,
    });
  });
  getCourses = this.catchAsync(async (req: Request, res: Response) => {
    const searchText = (req.query.searchText as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filters = req.query.filters
      ? JSON.parse(req.query.filters as string)
      : {};

    const courses = await CourseService.getCourses(
      searchText,
      page,
      limit,
      filters
    );

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  });
  getSingleCourse = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const course = await CourseService.getSingleCourse(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  });
  updateCourse = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await CourseService.updateCourse(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course updated successfully",
      data: null,
    });
  });
  deleteCourse = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await CourseService.deleteCourse(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course deleted successfully",
      data: null,
    });
  });
  updateCourseImage = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await CourseService.updateCourseImage(id, req.url);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course image changed successfully",
      data: null,
    });
  });
  updateCourseIntroductoryVideo = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as unknown as Types.ObjectId;
      await CourseService.updateCourseIntroductoryVideo(id, req.url);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course introductory video uploaded successfully",
        data: null,
      });
    }
  );
}

export const CourseController = new Controller();
