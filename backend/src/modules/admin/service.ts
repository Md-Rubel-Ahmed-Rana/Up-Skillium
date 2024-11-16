import { Admin } from "./model";
import generateAdminId from "./generateAdminId";
import { Types } from "mongoose";

class Service {
  async createNewAdmin(userId: Types.ObjectId): Promise<void> {
    const lastAdmin = await Admin.findOne({}).sort({ createdAt: -1 });
    const adminId = lastAdmin
      ? generateAdminId(lastAdmin.adminId)
      : generateAdminId("US-AD-0000");

    await Admin.create({ user: userId, adminId });
  }
}

export const AdminService = new Service();
