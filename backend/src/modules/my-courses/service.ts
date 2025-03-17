import { Types } from "mongoose";
import { IMyCourse } from "./interface";
import { MyCourse } from "./model";
import { ModuleService } from "../module/service";
import { LessonService } from "../lesson/service";

class Service {
  async addNewCourse(data: IMyCourse): Promise<void> {
    const lastLesson = await ModuleService.getFirstLessonOfFirstModuleByCourse(
      data.course
    );
    const courseCompleted = await this.calculateCourseCompletion(
      data.course,
      lastLesson?.id as Types.ObjectId
    );
    await MyCourse.create({
      ...data,
      lastCompletedLesson: lastLesson?.id,
      completionPercentage: courseCompleted,
    });
  }

  async completeLesson(
    courseId: Types.ObjectId,
    lessonId: Types.ObjectId
  ): Promise<void> {
    await this.calculateCourseCompletion(courseId, lessonId);
  }

  async calculateCourseCompletion(
    courseId: Types.ObjectId,
    lastCompletedLessonId: Types.ObjectId
  ): Promise<number> {
    let totalLessons = 0;
    let completedLessons = 0;

    const modules = await ModuleService.getModulesLessonsByCourseId(courseId);
    const lessons = await LessonService.getLessonsByModules(
      modules.map((module) => module?.id as Types.ObjectId)
    );

    if (!lessons.length) {
      return 0;
    }

    totalLessons = lessons.length;

    const sortedLessons = lessons.sort((a, b) => a.serial - b.serial);
    const lastCompletedIndex = sortedLessons.findIndex(
      (lesson) => lesson.id.toString() === lastCompletedLessonId.toString()
    );

    if (lastCompletedIndex !== -1) {
      completedLessons = lastCompletedIndex + 1;
    }

    const completionPercentage =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return Math.round(completionPercentage * 100) / 100;
  }
}

export const MyCourseService = new Service();
