import { Types } from "mongoose";
import { LessonService } from "../lesson/service";
import { INewQuiz, IQuizQuestion } from "./interface";
import { Quiz } from "./model";

class Service {
  async createQuiz(data: INewQuiz): Promise<void> {
    const newQuizzes = await Quiz.create(data.quizzes);
    const quizIds = newQuizzes.map((quiz) => quiz._id);
    await LessonService.createLesson({
      ...data.lesson,
      quizQuestions: quizIds,
    });
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
  async checkAndCalculateQuizAnswers(
    givenAnswers: { id: string; answer: string }[]
  ) {
    const totalQuiz = givenAnswers.length;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    const modifiedQuizAnswers: {
      question: string;
      givenAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[] = [];

    const quizIds = givenAnswers.map((answer) => answer.id);

    const findQuizzes = await Quiz.find({ _id: { $in: quizIds } });

    const quizMap = new Map(
      findQuizzes.map((quiz) => [quiz?._id.toString(), quiz])
    );

    for (const givenAnswer of givenAnswers) {
      const quiz = quizMap.get(givenAnswer?.id);

      if (quiz) {
        const isCorrect = quiz.correctAnswer === givenAnswer.answer;

        if (isCorrect) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }

        modifiedQuizAnswers.push({
          question: quiz.question,
          givenAnswer: givenAnswer.answer,
          correctAnswer: quiz.correctAnswer,
          isCorrect,
        });
      }
    }

    return {
      totalQuiz,
      correctAnswers,
      wrongAnswers,
      modifiedQuizAnswers,
    };
  }
}

export const QuizService = new Service();
