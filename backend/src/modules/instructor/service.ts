import { Types } from "mongoose";
import { RoleService } from "../role/service";
import { UserService } from "../user/service";
import { IInstructor } from "./interface";
import { Instructor } from "./model";
import generateTeacherId from "./generateTeacherId";

class Service {
  async createNewInstructor(data: IInstructor): Promise<void> {
    const lastTeacherId = await Instructor.findOne({}).sort({ createdAt: -1 });
    const teacherId = lastTeacherId
      ? generateTeacherId(lastTeacherId.teacherId)
      : generateTeacherId("US-TE-0000");

    data.teacherId = teacherId;
    const role = await RoleService.getRoleByRoleName(data.role);

    const userId = await UserService.register({
      name: data.user.name,
      email: data.user.email,
      password: data.user.password,
      role: role?.id as Types.ObjectId,
    });
    data.userId = userId;
    await Instructor.create(data);
  }
}

export const InstructorService = new Service();
