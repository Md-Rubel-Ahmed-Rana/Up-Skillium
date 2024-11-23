import { Admin } from "./model";
import generateAdminId from "./generateAdminId";
import { Types } from "mongoose";
import { IAdmin } from "./interface";

class Service {
  async createNewAdmin(userId: Types.ObjectId): Promise<void> {
    const lastAdmin = await Admin.findOne({}).sort({ createdAt: -1 });
    const adminId = lastAdmin
      ? generateAdminId(lastAdmin.adminId)
      : generateAdminId("US-AD-0000");

    await Admin.create({ user: userId, adminId });
  }
  async getAllAdmins(): Promise<IAdmin[]> {
    return await Admin.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { name: 1, email: 1, image: 1 },
      },
    ]);
  }
}

export const AdminService = new Service();
