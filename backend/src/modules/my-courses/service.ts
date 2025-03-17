import { Types } from "mongoose";
import { IMyCourse } from "./interface";
import { MyCourse } from "./model";
import { ModuleService } from "../module/service";
import { LessonService } from "../lesson/service";
import ApiError from "../../shared/apiError";

class Service {
  async addNewCourse(data: IMyCourse): Promise<void> {
    const isExist = await MyCourse.findOne({
      user: data.user,
      course: data.course,
    });
    if (isExist) {
      throw new ApiError(400, "You already have enrolled to this course!");
    }
    const lastLesson = await ModuleService.getFirstLessonOfFirstModuleByCourse(
      data.course
    );
    await MyCourse.create({
      ...data,
      completedLessons: lastLesson?._id,
      completionPercentage: 0,
    });

    await this.calculateCourseCompletion(
      data.user,
      data.course,
      lastLesson?._id as Types.ObjectId
    );
  }

  async getMyCourses(userId: Types.ObjectId): Promise<IMyCourse[]> {
    return await MyCourse.find({ user: userId }).populate([
      "user",
      "course",
      "lastCompletedLesson",
    ]);
  }

  async completeLesson(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    lessonId: Types.ObjectId
  ): Promise<void> {
    await this.calculateCourseCompletion(userId, courseId, lessonId);
  }

  private async calculateCourseCompletion(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    lastCompletedLessonId: Types.ObjectId
  ): Promise<void> {
    let totalLessons = 0;
    let completedLessonsCount = 0;

    const modules = await ModuleService.getModulesLessonsByCourseId(courseId);
    const lessons = await LessonService.getLessonsByModules(
      modules.map((module) => module?._id as Types.ObjectId)
    );

    if (!lessons.length) {
      return;
    }

    totalLessons = lessons.length;

    const myCourse: any = await MyCourse.findOne({
      user: userId,
      course: courseId,
    });

    let completedLessonIds =
      myCourse?.completedLessons.map((id: Types.ObjectId) => id.toString()) ||
      [];

    if (!completedLessonIds.includes(lastCompletedLessonId.toString())) {
      await MyCourse.findByIdAndUpdate(myCourse._id, {
        $push: { completedLessons: lastCompletedLessonId },
      });

      completedLessonIds.push(lastCompletedLessonId.toString());
    }

    completedLessonsCount = completedLessonIds.length;

    const completionPercentage =
      totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

    const finalCount = Math.round(completionPercentage * 100) / 100;

    await MyCourse.findByIdAndUpdate(myCourse._id, {
      completionPercentage: finalCount,
    });
  }
}

export const MyCourseService = new Service();
