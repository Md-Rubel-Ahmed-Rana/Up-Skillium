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
      user: data.userId,
    });

    const modules = await ModuleService.getModulesLessonsByCourseId(
      data.courseId
    );
    const reOrganizedModules = modules.map((module: any) => ({
      module: module.id,
      isModuleCompleted: false,
      lessons: module.lessons.map((lessonId: Types.ObjectId) => ({
        lesson: lessonId,
        isLessonCompleted: false,
      })),
    }));

    if (existingProgress) {
      const courseExists = existingProgress?.courses?.some(
        (course) => course?.course?.toString() === data?.courseId?.toString()
      );

      if (!courseExists) {
        existingProgress?.courses?.push({
          course: data.courseId,
          isCourseCompleted: false,
          lastLessonCompleted: null,
          completionPercentage: 0,
          modules: reOrganizedModules,
        });
        await existingProgress.save();
      }
    } else {
      const newCourseProgress: IStudentProgress = {
        user: data.userId,
        courses: [
          {
            course: data.courseId,
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
    return StudentProgress.findOne({ user: userId });
  }
  async getSingleCourseProgress(
    userId: Types.ObjectId,
    courseId: Types.ObjectId
  ) {
    const progress = await StudentProgress.findOne(
      {
        user: userId,
        "courses.course": courseId,
      },
      {
        "courses.$": 1,
      }
    )
      .populate({
        path: "courses.course",
        model: "Course",
        select: { title: 1 },
      })
      .populate({
        path: "courses.modules.module",
        model: "Module",
        select: { title: 1 },
      })
      .populate({
        path: "courses.modules.lessons.lesson",
        model: "Lesson",
        select: { title: 1, type: 1 },
      });

    if (!progress) {
      return null;
    }

    return progress.courses[0];
  }
}

export const StudentProgressService = new Service();
