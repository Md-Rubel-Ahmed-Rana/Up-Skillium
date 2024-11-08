import { Types } from "mongoose";
import { IQuizSubmission, IQuizSubmitData } from "./interface";
import { QuizSubmission } from "./model";
import { StudentProgressService } from "../student-progress/service";
import { QuizService } from "../quiz/service";

class Service {
  async submitQuiz(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    lessonId: Types.ObjectId,
    data: IQuizSubmitData[]
  ) {
    const result = await QuizService.checkAndCalculateQuizAnswers(data);
    const newData: IQuizSubmission = { ...result, userId, lessonId };
    await QuizSubmission.create(newData);
    await StudentProgressService.quizLessonMarkAsSubmitted(
      userId,
      courseId,
      moduleId,
      lessonId
    );
  }
  async getSubmittedQuizResultByLessonId(
    lessonId: Types.ObjectId
  ): Promise<IQuizSubmission | null> {
    return QuizSubmission.findOne({ lessonId });
  }
}

export const QuizSubmissionService = new Service();
