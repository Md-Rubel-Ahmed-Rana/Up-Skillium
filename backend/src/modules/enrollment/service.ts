import { Types } from "mongoose";
import { StudentProgressService } from "../student-progress/service";
import { IEnrollment } from "./interface";
import { Enrollment } from "./model";
import { StudentService } from "../student/service";

class Service {
  async createEnrollment(data: IEnrollment | IEnrollment[]): Promise<void> {
    await Enrollment.create(data);
  }

  async getEnrollmentById(id: Types.ObjectId): Promise<IEnrollment | null> {
    return await Enrollment.findById(id)
      .populate("user", "-password")
      .populate("course");
  }

  async updateEnrollment(
    id: string,
    data: Partial<IEnrollment>
  ): Promise<void> {
    await Enrollment.findByIdAndUpdate(id, data);
  }

  async getSuccessEnrollmentForStudent(
    userId: Types.ObjectId
  ): Promise<IEnrollment[]> {
    const data = await Enrollment.find({ user: userId, status: "success" })
      .populate("user", "-password")
      .populate("course");
    return data;
  }

  async getOrderEnrollmentHistoryForStudent(
    userId: Types.ObjectId
  ): Promise<IEnrollment[]> {
    const data = await Enrollment.find({ user: userId })
      .populate("user", "-password")
      .populate("course");
    return data;
  }

  async updateStatusAsSuccessByWebhook(sessionId: string): Promise<void> {
    const enrollment = await Enrollment.findOne({
      paymentSessionId: sessionId,
    });
    if (enrollment) {
      await Enrollment.updateOne(
        { paymentSessionId: sessionId },
        { $set: { status: "success" } }
      );
      await StudentProgressService.createOrUpdateStudentProgress({
        userId: enrollment?.user,
        courseId: enrollment?.course,
      });
      await StudentService.addNewCourse(enrollment?.user, enrollment?.course);
    }
  }

  async deleteEnrollment(id: string): Promise<void> {
    await Enrollment.findByIdAndDelete(id);
  }

  async getAllOrderHistory(): Promise<IEnrollment[]> {
    const enrollments = await Enrollment.find({})
      .populate("user", "-password")
      .populate("course");
    return enrollments;
  }

  async getAllSuccessEnrollments(): Promise<IEnrollment[]> {
    const enrollments = await Enrollment.find({ status: "success" })
      .populate("user", "-password")
      .populate("course");
    return enrollments;
  }

  async searchEnrollments(
    searchQuery: string,
    page: number = 1,
    limit: number = 10
  ): Promise<IEnrollment[]> {
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { "user.name": { $regex: searchQuery, $options: "i" } },
        { courseName: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const enrollments = await Enrollment.find(filter)
      .populate("user", "-password")
      .populate("course")
      .skip(skip)
      .limit(limit);

    return enrollments;
  }
}

export const EnrollmentService = new Service();
