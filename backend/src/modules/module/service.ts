import { Types } from "mongoose";
import { CourseService } from "../course/service";
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
      .populate("course", "title image category")
      .skip(skip)
      .limit(limit)
      .exec();

    return modules;
  }
  async getSingleModule(moduleId: Types.ObjectId): Promise<IModule | null> {
    return await Module.findById(moduleId);
  }
  async getModuleByCourseId(courseId: Types.ObjectId): Promise<IModule[]> {
    return await Module.find({ courseId: courseId });
  }
  async getFullClassByCourseId(courseId: Types.ObjectId) {
    const course = await CourseService.getSingleCourse(courseId);

    const modules = await Module.find({ course: courseId })
      .sort({ serial: 1 })
      .populate([
        {
          path: "lessons",
          model: "Lesson",
          options: { sort: { serial: 1 } },
          populate: {
            path: "quizQuestions",
            model: "Quiz",
          },
        },
      ]);

    return { course, modules };
  }
  async getModulesLessonsByCourseId(courseId: Types.ObjectId) {
    const modules = await Module.find({ course: courseId }).sort({ serial: 1 });
    return modules;
  }
  async updateModule(
    id: Types.ObjectId,
    updatedData: Partial<IModule>
  ): Promise<void> {
    await Module.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteModule(id: Types.ObjectId): Promise<void> {
    await Module.findByIdAndDelete(id);
  }
}

export const ModuleService = new Service();
