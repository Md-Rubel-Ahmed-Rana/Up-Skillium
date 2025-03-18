import { Types } from "mongoose";
import { CourseService } from "../course/service";
import { IGetModulesWithLessons, IModule } from "./interface";
import { Module } from "./model";
import { ILesson } from "../lesson/interface";
import { LessonService } from "../lesson/service";

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

  async getModulesLessonsByCourseId(
    courseId: Types.ObjectId
  ): Promise<IGetModulesWithLessons[]> {
    const modules = await Module.find({ course: courseId }).sort({ serial: 1 });

    const modulesWithLessons = await Promise.all(
      modules.map(async (module) => {
        const lessons = await LessonService.getLessonsByModule(
          module.id,
          1,
          100000
        );
        return { module, lessons };
      })
    );

    return modulesWithLessons;
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

  async getAllModulesByInstructor(
    instructorId: Types.ObjectId
  ): Promise<IModule[]> {
    const courseIds = await CourseService.getCourseIdsByInstructor(
      instructorId
    );
    const modules = await Module.find({ course: { $in: courseIds } }).populate(
      "course",
      "title image category"
    );
    return modules;
  }

  async getFirstLessonOfFirstModuleByCourse(
    courseId: Types.ObjectId
  ): Promise<ILesson | null> {
    const firstModule = await Module.findOne({ course: courseId })
      .sort({ serial: 1 })
      .populate("lessons")
      .lean();

    if (!firstModule || !firstModule.lessons.length) {
      return null;
    }

    return firstModule.lessons[0];
  }
}

export const ModuleService = new Service();
