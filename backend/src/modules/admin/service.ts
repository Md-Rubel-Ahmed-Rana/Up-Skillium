import { Types } from "mongoose";
import { RoleService } from "../role/service";
import { UserService } from "../user/service";
import { IAdmin } from "./interface";
import { Admin } from "./model";
import generateAdminId from "./generateAdminId";

class Service {
  async createNewAdmin(data: IAdmin): Promise<void> {
    const lastAdmin = await Admin.findOne({}).sort({ createdAt: -1 });
    const adminId = lastAdmin
      ? generateAdminId(lastAdmin.adminId)
      : generateAdminId("US-AD-0000");

    data.adminId = adminId;
    const role = await RoleService.getRoleByRoleName(data.role);

    const userId = await UserService.register({
      name: data.user.name,
      email: data.user.email,
      password: data.user.password,
      role: role?.id as Types.ObjectId,
    });
    data.userId = userId;
    await Admin.create(data);
  }
}

export const AdminService = new Service();
