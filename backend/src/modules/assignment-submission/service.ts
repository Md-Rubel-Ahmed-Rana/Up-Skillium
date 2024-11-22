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
    return await AssignmentSubmission.find({});
  }
  async getAllPendingSubmissions(): Promise<IAssignmentSubmission[]> {
    return await AssignmentSubmission.find({ status: "pending" });
  }
  async getAllReviewedSubmissions(): Promise<IAssignmentSubmission[]> {
    return await AssignmentSubmission.find({ status: "checked" });
  }
  async getAssignmentSubmissionByLessonId(
    userId: Types.ObjectId,
    lessonId: Types.ObjectId
  ) {
    return await AssignmentSubmission.findOne({
      userId: userId,
      lessonId: lessonId,
    });
  }
  async updateAssignmentReview(data: IAssignmentSubmission): Promise<void> {
    await AssignmentSubmission.findOneAndUpdate(
      {
        userId: data.userId,
        lessonId: data.lessonId,
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
