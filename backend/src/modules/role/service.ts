import { IGetRole, IRole } from "./interface";
import { Role } from "./model";

class Service {
  async createRole(data: IRole): Promise<void> {
    await Role.create(data);
  }
  async getAllRoles(): Promise<IRole[]> {
    return await Role.find({});
  }
  async getRoleById(id: string): Promise<IGetRole | null> {
    return await Role.findById(id);
  }
  async getRoleByRoleName(roleName: string): Promise<IGetRole | null> {
    return await Role.findOne({ role: roleName });
  }
  async updateRole(id: string, updatedData: Partial<IRole>): Promise<void> {
    await Role.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteRole(id: string): Promise<void> {
    await Role.findByIdAndDelete(id);
  }
}

export const RoleService = new Service();
