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
    const data = await Student.findOne({ user: userId }).populate(
      "courses",
      "title image"
    );

    return data;
  }
  async getAllStudents() {
    const data = await Student.find({})
      .populate("courses", "title image category")
      .populate("user", "name email");

    return data;
  }
}

export const StudentService = new Service();
