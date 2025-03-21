import { Types } from "mongoose";
import { IAssignmentSubmission } from "./interface";
import { AssignmentSubmission } from "./model";
import { ModuleService } from "../module/service";

class Service {
  async submit(data: IAssignmentSubmission): Promise<IAssignmentSubmission> {
    const result = await AssignmentSubmission.create(data);
    return result;
  }
  async getAllSubmission(): Promise<IAssignmentSubmission[]> {
    return await AssignmentSubmission.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "lesson",
        model: "Lesson",
      },
    ]);
  }

  async getSingleSubmission(
    id: Types.ObjectId
  ): Promise<IAssignmentSubmission | null> {
    return await AssignmentSubmission.findById(id).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "lesson",
        model: "Lesson",
      },
    ]);
  }

  async getAllPendingSubmissions(): Promise<IAssignmentSubmission[]> {
    return await AssignmentSubmission.find({ status: "pending" }).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "lesson",
        model: "Lesson",
      },
    ]);
  }
  async getAllReviewedSubmissions(): Promise<IAssignmentSubmission[]> {
    return await AssignmentSubmission.find({ status: "checked" }).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "lesson",
        model: "Lesson",
      },
    ]);
  }
  async getAssignmentSubmissionByLessonId(
    userId: Types.ObjectId,
    lessonId: Types.ObjectId
  ) {
    return await AssignmentSubmission.findOne({
      user: userId,
      lesson: lessonId,
    });
  }
  async updateAssignmentReview(data: IAssignmentSubmission): Promise<void> {
    await AssignmentSubmission.findOneAndUpdate(
      {
        user: data.user,
        lesson: data.lesson,
      },
      { $set: { ...data } }
    );
  }
  async updateSubmission(
    id: Types.ObjectId,
    updatedData: IAssignmentSubmission
  ) {
    await AssignmentSubmission.findByIdAndUpdate(id, {
      $set: { ...updatedData },
    });
  }
  async getPendingAssignmentByInstructor(
    instructorId: Types.ObjectId
  ): Promise<IAssignmentSubmission[]> {
    const modules = await ModuleService.getAllModulesByInstructor(instructorId);
    const moduleIds = modules.map((module) => module?.id) as Types.ObjectId[];
    const assignments = await AssignmentSubmission.find({
      "lesson.module": { $in: moduleIds },
      status: "pending",
    });
    return assignments;
  }
  async getCompletedAssignmentByInstructor(
    instructorId: Types.ObjectId
  ): Promise<IAssignmentSubmission[]> {
    const modules = await ModuleService.getAllModulesByInstructor(instructorId);
    const moduleIds = modules.map((module) => module?.id) as Types.ObjectId[];
    const assignments = await AssignmentSubmission.find({
      "lesson.module": { $in: moduleIds },
      status: "checked",
    });
    return assignments;
  }
}

export const AssignmentSubmissionService = new Service();
