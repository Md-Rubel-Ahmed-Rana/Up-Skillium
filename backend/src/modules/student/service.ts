import { Types } from "mongoose";
import { RoleService } from "../role/service";
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
    const role = await RoleService.getRoleByRoleName("student");

    const userId = await UserService.register({
      name: data.user.name,
      email: data.user.email,
      password: data.user.password,
      role: role?.id as Types.ObjectId,
    });
    data.userId = userId;
    await Student.create(data);
  }
}

export const StudentService = new Service();
