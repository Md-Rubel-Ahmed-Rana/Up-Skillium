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
  getOnlyPublishedCourses = this.catchAsync(
    async (req: Request, res: Response) => {
      const searchText = (req.query.searchText as string) || "";
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const filters = req.query.filters
        ? JSON.parse(req.query.filters as string)
        : {};

      const data = await CourseService.getOnlyPublishedCourses(
        searchText,
        page,
        limit,
        filters
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Published courses fetched successfully",
        data: data,
      });
    }
  );
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
  getCoursesByInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      const course = await CourseService.getCoursesByInstructor(instructorId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Courses fetched successfully",
        data: course,
      });
    }
  );
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
  updateCourseBasicInfo = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as unknown as Types.ObjectId;
      await CourseService.updateCourseBasicInfo(id, req.body);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course  basic info updated successfully",
        data: null,
      });
    }
  );
  updateCoursePrice = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await CourseService.updateCoursePrice(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course price updated successfully",
      data: null,
    });
  });
  updateCourseTagsTechnologies = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.id as unknown as Types.ObjectId;
      await CourseService.updateCourseTagsTechnologies(id, req.body);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course tags and technologies updated successfully",
        data: null,
      });
    }
  );
  updateCourseInstructor = this.catchAsync(
    async (req: Request, res: Response) => {
      const courseId = req.params.courseId as unknown as Types.ObjectId;
      const instructorId = req.params.instructorId as unknown as Types.ObjectId;
      await CourseService.updateCourseInstructor(courseId, instructorId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course instructor updated successfully",
        data: null,
      });
    }
  );
  getMatchedRelatedCourses = this.catchAsync(
    async (req: Request, res: Response) => {
      const relatableText = req.query?.relatableText as string;
      const courses = await CourseService.getMatchedRelatedCourses(
        relatableText
      );
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Related courses retrieved successfully",
        data: courses,
      });
    }
  );
  getCoursesByCategory = this.catchAsync(
    async (req: Request, res: Response) => {
      const category = req.params?.category as string;
      const courses = await CourseService.getCoursesByCategory(category);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Courses retrieved by category successfully",
        data: courses,
      });
    }
  );
}

export const CourseController = new Controller();
