import { Types } from "mongoose";
import { LessonService } from "../lesson/service";
import { INewQuiz, IQuizQuestion } from "./interface";
import { Quiz } from "./model";

class Service {
  async createQuiz(data: INewQuiz): Promise<void> {
    await LessonService.createLesson({
      ...data.lesson,
      quizQuestions: data.quizzes,
    });
    await Quiz.create(data.quizzes);
  }
  async getAllQuizzes(
    search: string = "",
    moduleId?: Types.ObjectId,
    page: number = 1,
    limit: number = 10
  ): Promise<IQuizQuestion[]> {
    const searchQuery: any = {
      ...(search && { question: { $regex: search, $options: "i" } }),
      ...(moduleId && { moduleId }),
    };

    const skip = (page - 1) * limit;

    const quizzes = await Quiz.find(searchQuery).skip(skip).limit(limit).exec();

    return quizzes;
  }
  async getQuizzesByModuleId(
    moduleId: Types.ObjectId
  ): Promise<IQuizQuestion[]> {
    return await Quiz.find({ moduleId: moduleId });
  }
  async getSingleQuiz(id: Types.ObjectId): Promise<IQuizQuestion | null> {
    return await Quiz.findById(id);
  }
  async updateQuiz(
    id: Types.ObjectId,
    updatedData: Partial<IQuizQuestion>
  ): Promise<void> {
    await Quiz.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteQuiz(id: Types.ObjectId): Promise<void> {
    await Quiz.findByIdAndDelete(id);
  }
}

export const QuizService = new Service();
