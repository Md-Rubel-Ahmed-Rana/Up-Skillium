import { IModule } from "./interface";
import { Module } from "./model";

class Service {
  async createNewModule(data: IModule): Promise<void> {
    await Module.create(data);
  }
  async getAllModules(
    search: string = "",
    page: number = 1,
    limit: number = 10,
    courseId?: string
  ): Promise<IModule[]> {
    const searchQuery: any = {
      ...(search && { title: { $regex: search, $options: "i" } }),
      ...(courseId && { courseId }),
    };

    const skip = (page - 1) * limit;

    const modules = await Module.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .exec();

    return modules;
  }
  async getSingleModule(moduleId: string): Promise<IModule | null> {
    return await Module.findById(moduleId);
  }
  async getModuleByCourseId(courseId: string): Promise<IModule[]> {
    return await Module.find({ courseId: courseId });
  }
  async updateModule(id: string, updatedData: Partial<IModule>): Promise<void> {
    await Module.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteModule(id: string): Promise<void> {
    await Module.findByIdAndDelete(id);
  }
}

export const ModuleService = new Service();
