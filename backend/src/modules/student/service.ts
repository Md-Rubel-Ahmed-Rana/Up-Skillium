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
  async addNewCourse(userId: Types.ObjectId, courseId: Types.ObjectId) {
    await Student.findOneAndUpdate(
      { user: userId },
      {
        $push: { courses: courseId },
      }
    );
  }
  async getMyCourses(userId: Types.ObjectId) {
    const data = await Student.findOne({ user: userId })
      .populate("courses")
      .populate("user", "-password");

    return data;
  }
  async getAllStudents() {
    const data = await Student.find({})
      .populate("courses")
      .populate("user", "-password");

    return data;
  }
  async getStudentIdByUserId(id: Types.ObjectId): Promise<string> {
    const student = await Student.findOne({ user: id }).select("studentId");
    return student ? student.studentId : "";
  }
}

export const StudentService = new Service();
