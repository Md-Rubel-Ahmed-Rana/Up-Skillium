import { UserService } from "../user/service";
import { INewStudent } from "./interface";
import { Student } from "./model";

class Service {
  async createNewStudent(data: INewStudent) {
    const lastStudent = await Student.findOne({}).sort({ createdAt: -1 });
    const studentId = lastStudent
      ? generateStudentId(lastStudent.studentId)
      : generateStudentId("US-ST-0000");

    data.studentId = studentId;
    await Student.create(data);
  }
}

export const StudentService = new Service();
