import { Types } from "mongoose";
import RootController from "../../shared/rootController";
import { LiveClassService } from "./service";

class Controller extends RootController {
  createLiveClass = this.catchAsync(async (req, res) => {
    await LiveClassService.createLiveClass(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Live class created successfully!",
      data: null,
    });
  });
  getAllLiveClasses = this.catchAsync(async (req, res) => {
    const filters = {
      title: req.query.title as string,
      instructor: req.query.instructor as unknown as Types.ObjectId,
      creator: req.query.creator as unknown as Types.ObjectId,
      course: req.query.course as unknown as Types.ObjectId,
      status: req.query.status as
        | "upcoming"
        | "ongoing"
        | "completed"
        | "cancelled",
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      keywords: req.query.keywords as string,
    };

    const classes = await LiveClassService.getAllLiveClasses(filters);

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Live classes retrieved successfully!",
      data: classes,
    });
  });
  getLiveClassesByInstructor = this.catchAsync(async (req, res) => {
    const instructorId = req.params.instructor as unknown as Types.ObjectId;
    const classes = await LiveClassService.getLiveClassesByInstructor(
      instructorId
    );

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Live classes retrieved successfully!",
      data: classes,
    });
  });
  getUpcomingLiveClassesByInstructor = this.catchAsync(async (req, res) => {
    const instructorId = req.params.instructor as unknown as Types.ObjectId;
    const classes = await LiveClassService.getUpcomingLiveClassesByInstructor(
      instructorId
    );

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Upcoming live classes retrieved successfully!",
      data: classes,
    });
  });
  getCompletedLiveClassesByInstructor = this.catchAsync(async (req, res) => {
    const instructorId = req.params.instructor as unknown as Types.ObjectId;
    const classes = await LiveClassService.getCompletedLiveClassesByInstructor(
      instructorId
    );

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Completed live classes retrieved successfully!",
      data: classes,
    });
  });
  getLiveClassesByStudent = this.catchAsync(async (req, res) => {
    const studentId = req.params.studentId as unknown as Types.ObjectId;
    const classes = await LiveClassService.getLiveClassesByStudent(studentId);

    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Live classes retrieved successfully!",
      data: classes,
    });
  });
  getSingleClass = this.catchAsync(async (req, res) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const data = await LiveClassService.getSingleClass(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Live class retrieved successfully!",
      data: data,
    });
  });
  updateClass = this.catchAsync(async (req, res) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await LiveClassService.updateClass(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Live class updated successfully!",
      data: null,
    });
  });
  deleteClass = this.catchAsync(async (req, res) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await LiveClassService.deleteClass(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Live class deleted successfully!",
      data: null,
    });
  });
}

export const LiveClassController = new Controller();
