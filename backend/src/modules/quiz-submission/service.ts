import { LessonService } from "../lesson/service";
import { IQuizSubmission } from "./interface";
import { QuizSubmission } from "./model";

class Service {
  async submitQuiz(data: IQuizSubmission) {
    await QuizSubmission.create(data);
    await LessonService.quizLessonMarkAsSubmitted(data?.lessonId);
  }
}

export const QuizSubmissionService = new Service();
