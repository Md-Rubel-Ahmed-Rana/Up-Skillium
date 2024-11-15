import { IQuizQuestion } from "../quiz/interface";
import { QuizService } from "../quiz/service";
import { ILesson, IQuizUpdateOnLesson } from "./interface";
import { Lesson } from "./model";
import { Types } from "mongoose";

class Service {
  async createLesson(data: ILesson | ILesson[]): Promise<void> {
    await Lesson.create(data);
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

    return await Lesson.find(searchQuery).skip(skip).limit(limit).exec();
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
}

export const LessonService = new Service();
