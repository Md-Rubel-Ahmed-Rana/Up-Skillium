import { Types } from "mongoose";
import generateStudentId from "./generateStudentId";
import { Student } from "./model";

class Service {
  async createNewStudent(userId: Types.ObjectId): Promise<void> {
    const lastStudent = await Student.findOne({}).sort({ createdAt: -1 });
    const studentId = lastStudent
      ? generateStudentId(lastStudent.studentId)
      : generateStudentId("US-ST-0000");

    await Student.create({ user: userId, studentId: studentId });
  }
  async addNewCourse(
    studentObjectId: Types.ObjectId,
    courseId: Types.ObjectId
  ) {
    await Student.findByIdAndUpdate(studentObjectId, {
      $push: { coursesEnrolled: courseId },
    });
  }
  async getMyCourses(userId: Types.ObjectId) {
    const data = await Student.findOne({ userId: userId })
      .populate("coursesEnrolled", "title image")
      .exec();

    return data;
  }
}

export const StudentService = new Service();
