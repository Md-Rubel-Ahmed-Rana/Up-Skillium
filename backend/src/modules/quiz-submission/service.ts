import { Types } from "mongoose";
import { LessonService } from "../lesson/service";
import { IQuizSubmission } from "./interface";
import { QuizSubmission } from "./model";

class Service {
  async submitQuiz(data: IQuizSubmission) {
    await QuizSubmission.create(data);
    await LessonService.quizLessonMarkAsSubmitted(data?.lessonId);
  }
  async getSubmittedQuizResultByLessonId(
    lessonId: Types.ObjectId
  ): Promise<IQuizSubmission | null> {
    return QuizSubmission.findOne({ lessonId });
  }
}

export const QuizSubmissionService = new Service();
