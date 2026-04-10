import { Types } from "mongoose";
import { IAssignmentSubmission } from "./interface";
import { AssignmentSubmission } from "./model";
import { ModuleService } from "../module/service";
import { MailService } from "../mail/mail.service";
import { IAssignmentMarkedMail } from "../mail/interface";

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
    const assignment: any = await AssignmentSubmission.findOneAndUpdate(
      {
        user: data.user,
        lesson: data.lesson,
      },
      { $set: { ...data } },
      { new: true }
    ).populate(["user", "lesson"]);

    // Send notification email to student
    const mailData: IAssignmentMarkedMail = {
      assignmentTitle: assignment?.lesson?.title,
      student: {
        name: assignment?.user?.name,
        email: assignment?.user?.email,
      },
      marks: assignment.yourMark,
      totalMarks: assignment.fullMark,
    };
    await MailService.sendAssignmentMarkedMail(mailData);
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
  async getAssignmentSubmissionAnalyticsSummary() {
    const summary = await AssignmentSubmission.aggregate([
      {
        $group: {
          _id: null,
          totalSubmissions: { $sum: 1 },
          totalChecked: {
            $sum: { $cond: [{ $eq: ["$status", "checked"] }, 1, 0] },
          },
          totalPending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          totalLate: {
            $sum: { $cond: ["$isLate", 1, 0] },
          },
          totalOnTime: {
            $sum: { $cond: ["$isLate", 0, 1] },
          },
          averageMark: { $avg: "$yourMark" },
          averageFullMark: { $avg: "$fullMark" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSubmissions: 1,
          totalChecked: 1,
          totalPending: 1,
          totalLate: 1,
          totalOnTime: 1,
          averageMark: { $round: ["$averageMark", 2] },
          averageFullMark: { $round: ["$averageFullMark", 2] },
        },
      },
    ]);

    return (
      summary[0] || {
        totalSubmissions: 0,
        totalChecked: 0,
        totalPending: 0,
        totalLate: 0,
        totalOnTime: 0,
        averageMark: 0,
        averageFullMark: 0,
      }
    );
  }
}

export const AssignmentSubmissionService = new Service();
