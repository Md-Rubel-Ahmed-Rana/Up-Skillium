import { Types } from "mongoose";
import { ModuleService } from "../module/service";
import { StudentProgress } from "./model";
import { IProgressCalculate, IStudentProgress } from "./interface";

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

    const firstModule = reOrganizedModules[0];
    const firstLessonId = firstModule?.lessons[0]?.lesson || null;

    if (existingProgress) {
      const courseExists = existingProgress?.courses?.some(
        (course) => course?.course?.toString() === data?.courseId?.toString()
      );

      if (!courseExists) {
        reOrganizedModules[0].lessons[0].isLessonCompleted = true;
        existingProgress?.courses?.push({
          course: data.courseId,
          isCourseCompleted: false,
          lastCompletedLesson: firstLessonId,
          completionPercentage: 0,
          modules: reOrganizedModules,
        });
        await existingProgress.save();
      }
    } else {
      reOrganizedModules[0].lessons[0].isLessonCompleted = true;
      const newCourseProgress: IStudentProgress = {
        user: data.userId,
        courses: [
          {
            course: data.courseId,
            isCourseCompleted: false,
            lastCompletedLesson: firstLessonId,
            completionPercentage: 0,
            modules: reOrganizedModules,
          },
        ],
      };
      await StudentProgress.create(newCourseProgress);
    }
  }

  async getAllCoursesProgress() {
    const progresses = await StudentProgress.find({})
      .populate({
        path: "courses.course",
        model: "Course",
        select: { title: 1, image: 1 },
      })
      .populate({
        path: "courses.lastCompletedLesson",
        model: "Lesson",
      })
      .select({
        "courses.course": 1,
        "courses.isCourseCompleted": 1,
        "courses.completionPercentage": 1,
        "courses.lastCompletedLesson": 1,
      });

    return progresses;
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
      })
      .populate({
        path: "courses.lastCompletedLesson",
        model: "Lesson",
      });

    if (!progress) {
      return null;
    }

    return progress.courses[0];
  }

  async getAllCourseProgress(userId: Types.ObjectId) {
    const progress = await StudentProgress.findOne({
      user: userId,
    })
      .populate({
        path: "courses.course",
        model: "Course",
        select: { title: 1, image: 1 },
      })
      .populate({
        path: "courses.lastCompletedLesson",
        model: "Lesson",
      })
      .select({
        "courses.course": 1,
        "courses.isCourseCompleted": 1,
        "courses.completionPercentage": 1,
        "courses.lastCompletedLesson": 1,
      });

    if (!progress) {
      return null;
    }

    return progress.courses;
  }

  async completeLesson(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    lessonId: Types.ObjectId
  ) {
    const progress = await StudentProgress.findOne({
      user: userId,
      "courses.course": courseId,
      "courses.modules.module": moduleId,
      "courses.modules.lessons.lesson": lessonId,
    });

    if (!progress) {
      throw new Error("Progress not found");
    }

    const course = progress?.courses?.find((c) => c.course.equals(courseId));
    if (!course) return;

    const module = course?.modules?.find((m) => m.module.equals(moduleId));
    if (!module) return;

    const lesson = module?.lessons?.find((l) => l.lesson.equals(lessonId));
    if (!lesson) return;

    lesson.isLessonCompleted = true;

    if (module.lessons.every((l) => l.isLessonCompleted)) {
      module.isModuleCompleted = true;
    }

    course.lastCompletedLesson = lessonId;
    const progressData = await this.getSingleCourseProgress(userId, courseId);
    course.completionPercentage = await this.calculateCourseCompletion(
      progressData as any
    );
    await progress.save();
  }

  async calculateCourseCompletion(
    progress: IProgressCalculate
  ): Promise<number> {
    let totalLessons = 0;
    let completedLessons = 0;

    progress?.modules?.forEach((module) => {
      module?.lessons?.forEach((lesson) => {
        totalLessons++;
        if (lesson?.isLessonCompleted) {
          completedLessons++;
        }
      });
    });

    const completionPercentage =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    progress.completionPercentage =
      Math.round(completionPercentage * 100) / 100;

    return progress.completionPercentage;
  }

  async assignmentLessonMarkAsSubmitted(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    lessonId: Types.ObjectId
  ) {
    await StudentProgress.updateOne(
      {
        user: userId,
        "courses.course": courseId,
        "courses.modules.module": moduleId,
        "courses.modules.lessons.lesson": lessonId,
      },
      {
        $set: {
          "courses.$[course].modules.$[module].lessons.$[lesson].isAssignmentSubmitted":
            true,
        },
      },
      {
        arrayFilters: [
          { "course.course": courseId },
          { "module.module": moduleId },
          { "lesson.lesson": lessonId },
        ],
      }
    );
  }

  async quizLessonMarkAsSubmitted(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    lessonId: Types.ObjectId
  ) {
    const lesson = await StudentProgress.findOne({
      user: userId,
      "courses.course": courseId,
      "courses.modules.module": moduleId,
      "courses.modules.lessons.lesson": lessonId,
    });
    await StudentProgress.updateOne(
      {
        user: userId,
        "courses.course": courseId,
        "courses.modules.module": moduleId,
        "courses.modules.lessons.lesson": lessonId,
      },
      {
        $set: {
          "courses.$[course].modules.$[module].lessons.$[lesson].isQuizSubmitted":
            true,
        },
      },
      {
        arrayFilters: [
          { "course.course": courseId },
          { "module.module": moduleId },
          { "lesson.lesson": lessonId },
        ],
      }
    );
  }
}

export const StudentProgressService = new Service();
