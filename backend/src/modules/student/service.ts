import { UserService } from "../user/service";
import generateStudentId from "./generateStudentId";
import { INewStudent } from "./interface";
import { Student } from "./model";

class Service {
  async createNewStudent(data: INewStudent): Promise<void> {
    const lastStudent = await Student.findOne({}).sort({ createdAt: -1 });
    const studentId = lastStudent
      ? generateStudentId(lastStudent.studentId)
      : generateStudentId("US-ST-0000");

    data.studentId = studentId;

    const userId = await UserService.register({
      name: data.user.name,
      email: data.user.email,
      password: data.user.password,
      role: "student",
      permissions: ["student", "course_view"],
    });
    data.userId = userId;
    await Student.create(data);
  }
}

export const StudentService = new Service();
