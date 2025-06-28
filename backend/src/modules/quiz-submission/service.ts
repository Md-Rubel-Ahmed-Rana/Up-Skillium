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
  async getSingleQuizSubmission(
    id: Types.ObjectId
  ): Promise<IQuizSubmission | null> {
    return await QuizSubmission.findById(id).populate([
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
  async getSubmittedQuizResultByLessonId(
    userId: Types.ObjectId,
    lessonId: Types.ObjectId
  ): Promise<IQuizSubmission | null> {
    return QuizSubmission.findOne({ user: userId, lesson: lessonId }).populate([
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
  async getQuizSubmissionAnalyticsSummary() {
    const summary = await QuizSubmission.aggregate([
      {
        $group: {
          _id: null,
          totalSubmissions: { $sum: 1 },
          totalCorrectAnswers: { $sum: "$correctAnswers" },
          totalWrongAnswers: { $sum: "$wrongAnswers" },
          totalQuestions: { $sum: "$totalQuiz" },
          highestScore: { $max: "$correctAnswers" },
          lowestScore: { $min: "$correctAnswers" },
        },
      },
      {
        $addFields: {
          averageScorePercentage: {
            $cond: [
              { $eq: ["$totalQuestions", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$totalCorrectAnswers", "$totalQuestions"] },
                  100,
                ],
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalSubmissions: 1,
          totalCorrectAnswers: 1,
          totalWrongAnswers: 1,
          averageScorePercentage: { $round: ["$averageScorePercentage", 2] },
          highestScore: 1,
          lowestScore: 1,
        },
      },
    ]);

    return summary[0];
  }
}

export const QuizSubmissionService = new Service();
