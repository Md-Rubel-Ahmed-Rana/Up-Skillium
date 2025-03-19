import { Types } from "mongoose";
import { IQuizSubmission, IQuizSubmitData } from "./interface";
import { QuizSubmission } from "./model";
import { QuizService } from "../quiz/service";

class Service {
  async submitQuiz(
    userId: Types.ObjectId,
    lessonId: Types.ObjectId,
    data: IQuizSubmitData[]
  ) {
    const result = await QuizService.checkAndCalculateQuizAnswers(data);
    const newData: IQuizSubmission = {
      ...result,
      user: userId,
      lesson: lessonId,
    };
    await QuizSubmission.create(newData);
  }
  async getSubmittedQuizResultByLessonId(
    lessonId: Types.ObjectId
  ): Promise<IQuizSubmission | null> {
    return QuizSubmission.findOne({ lesson: lessonId }).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "lesson",
        model: "Lesson",
      },
    ]);
  }
  async getAllQuizSubmissions(): Promise<IQuizSubmission[]> {
    return await QuizSubmission.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "lesson",
        model: "Lesson",
      },
    ]);
  }
}

export const QuizSubmissionService = new Service();
