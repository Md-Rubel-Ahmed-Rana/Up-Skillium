import ApiError from "../../shared/apiError";
import { ModuleService } from "../module/service";
import { IQuizQuestion } from "../quiz/interface";
import { QuizService } from "../quiz/service";
import { ICreateQuizLesson, ILesson, IQuizUpdateOnLesson } from "./interface";
import { Lesson } from "./model";
import { Types } from "mongoose";

class Service {
  async createLesson(data: ILesson | ILesson[]): Promise<void> {
    await Lesson.create(data);
  }

  async createVideoLesson(data: ILesson | ILesson[]): Promise<void> {
    await Lesson.create(data);
  }

  async createQuizLesson(data: ICreateQuizLesson): Promise<void> {
    if (data?.quizQuestions && data?.quizQuestions?.length > 0) {
      const createdQuizzes = await QuizService.createQuizzes(
        data?.quizQuestions as IQuizQuestion[]
      );
      await Lesson.create({ ...data, quizQuestions: createdQuizzes });
    } else {
      throw new ApiError(400, "Quizzes must be included with lesson data");
    }
  }

  async getAllLessons(
    search: string = "",
    type?: "video" | "instruction" | "quiz" | "assignment",
    page: number = 1,
    limit: number = 10
  ): Promise<ILesson[]> {
    const searchQuery: any = {
      ...(search && { title: { $regex: search, $options: "i" } }),
      ...(type && { type }),
    };

    const skip = (page - 1) * limit;

    return await Lesson.find(searchQuery)
      .populate("module", "title serial")
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getAllAssignmentLessons(): Promise<ILesson[]> {
    return await Lesson.find({ type: "assignment" }).populate(
      "module",
      "title serial"
    );
  }

  async getLessonById(id: Types.ObjectId): Promise<ILesson | null> {
    return await Lesson.findById(id)
      .populate({
        path: "quizQuestions",
        select: "-correctAnswer",
      })
      .exec();
  }

  async getLessonByIdWithQuizCorrectAnswer(
    id: Types.ObjectId
  ): Promise<ILesson | null> {
    return await Lesson.findById(id)
      .populate({
        path: "quizQuestions",
      })
      .exec();
  }

  async updateLesson(
    id: Types.ObjectId,
    data: Partial<ILesson>
  ): Promise<void> {
    await Lesson.findByIdAndUpdate(id, { ...data }).exec();
  }

  async deleteLesson(id: Types.ObjectId): Promise<void> {
    await Lesson.findByIdAndDelete(id).exec();
  }

  async updateQuizzesInLesson(
    lessonId: Types.ObjectId,
    quizzes: IQuizUpdateOnLesson[]
  ) {
    const newQuizzes: IQuizUpdateOnLesson[] = [];
    const oldQuizzes: IQuizUpdateOnLesson[] = [];
    quizzes.forEach((quiz) => {
      if (quiz?.id) {
        oldQuizzes.push(quiz);
      } else {
        newQuizzes.push(quiz);
      }
    });

    await QuizService.updateManyQuizzes(oldQuizzes);
    const oldQuizIds = oldQuizzes.map((quiz) => new Types.ObjectId(quiz?.id));
    const newQuizIds = await QuizService.createNewQuizFromLessonUpdate(
      newQuizzes
    );
    const finalQuizIds = oldQuizIds.concat(newQuizIds);
    await Lesson.findByIdAndUpdate(lessonId, {
      $set: { quizQuestions: finalQuizIds },
    });
  }

  async getLessonsByModule(
    moduleId: Types.ObjectId,
    page: number = 1,
    limit: number = 10
  ): Promise<ILesson[]> {
    const skip = (page - 1) * limit;
    return await Lesson.find({ module: moduleId })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getAllLessonsByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ILesson[]> {
    const modules = await ModuleService.getAllModulesByInstructor(instructorId);
    const moduleIds = modules.map((module) => module?.id) as Types.ObjectId[];
    const lessons = await Lesson.find({ module: { $in: moduleIds } })
      .populate("module", "title serial")
      .populate({
        path: "quizQuestions",
      });
    return lessons;
  }

  async getAllQuizLessonsByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ILesson[]> {
    const modules = await ModuleService.getAllModulesByInstructor(instructorId);
    const moduleIds = modules.map((module) => module?.id) as Types.ObjectId[];
    const lessons = await Lesson.find({
      module: { $in: moduleIds },
      type: "quiz",
    })
      .populate("module", "title serial")
      .populate({
        path: "quizQuestions",
      });
    return lessons;
  }

  async getAllAssignmentLessonsByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ILesson[]> {
    const modules = await ModuleService.getAllModulesByInstructor(instructorId);
    const moduleIds = modules.map((module) => module?.id) as Types.ObjectId[];
    const lessons = await Lesson.find({
      module: { $in: moduleIds },
      type: "assignment",
    }).populate("module", "title serial");
    return lessons;
  }
}

export const LessonService = new Service();
