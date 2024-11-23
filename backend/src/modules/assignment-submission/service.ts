import { Types } from "mongoose";
import { StudentProgressService } from "../student-progress/service";
import { IAssignmentSubmission } from "./interface";
import { AssignmentSubmission } from "./model";

class Service {
  async submit(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    lessonId: Types.ObjectId,
    data: IAssignmentSubmission
  ): Promise<IAssignmentSubmission> {
    const result = await AssignmentSubmission.create(data);
    await StudentProgressService.assignmentLessonMarkAsSubmitted(
      userId,
      courseId,
      moduleId,
      lessonId
    );
    return result;
  }
  async getAllSubmission(): Promise<IAssignmentSubmission[]> {
    return await AssignmentSubmission.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { name: 1, email: 1, image: 1 },
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
        select: { name: 1, email: 1, image: 1 },
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
        select: { name: 1, email: 1, image: 1 },
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
}

export const AssignmentSubmissionService = new Service();
