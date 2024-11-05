import { Types } from "mongoose";
import { ModuleService } from "../module/service";
import { StudentProgress } from "./model";
import { IStudentProgress } from "./interface";

class Service {
  async createOrUpdateStudentProgress(data: {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
  }): Promise<void> {
    const existingProgress = await StudentProgress.findOne({
      userId: data.userId,
    });

    const modules = await ModuleService.getModulesLessonsByCourseId(
      data.courseId
    );
    const reOrganizedModules = modules.map((module: any) => ({
      moduleId: module.id,
      isModuleCompleted: false,
      lessons: module.lessons.map((lessonId: Types.ObjectId) => ({
        lessonId,
        isLessonCompleted: false,
      })),
    }));

    if (existingProgress) {
      const courseExists = existingProgress?.courses?.some(
        (course) => course?.courseId?.toString() === data?.courseId?.toString()
      );

      if (!courseExists) {
        existingProgress?.courses?.push({
          courseId: data.courseId,
          isCourseCompleted: false,
          lastLessonCompleted: null,
          completionPercentage: 0,
          modules: reOrganizedModules,
        });
        await existingProgress.save();
      }
    } else {
      const newCourseProgress: IStudentProgress = {
        userId: data.userId,
        courses: [
          {
            courseId: data.courseId,
            isCourseCompleted: false,
            lastLessonCompleted: null,
            completionPercentage: 0,
            modules: reOrganizedModules,
          },
        ],
      };
      await StudentProgress.create(newCourseProgress);
    }
  }
  async getStudentProgress(userId: Types.ObjectId) {
    return StudentProgress.findOne({ userId: userId });
  }
  async getSingleCourseProgress(
    userId: Types.ObjectId,
    courseId: Types.ObjectId
  ) {
    const progress = await StudentProgress.findOne(
      {
        userId: userId,
        "courses.courseId": courseId,
      },
      {
        "courses.$": 1,
      }
    );

    if (!progress) {
      return null;
    }

    return progress?.courses[0];
  }
}

export const StudentProgressService = new Service();
