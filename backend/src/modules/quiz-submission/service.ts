import { IQuizSubmission } from "./interface";
import { QuizSubmission } from "./model";

class Service {
  async submitQuiz(data: IQuizSubmission) {
    await QuizSubmission.create(data);
  }
}

export const QuizSubmissionService = new Service();
