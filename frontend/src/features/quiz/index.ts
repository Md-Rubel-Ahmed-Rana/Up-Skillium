import apiSlice from "../api/apiSlice";
import { IGetQuizQuestion } from "./../../types/quiz.type";

const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateQuiz: builder.mutation({
      query: ({
        quizId,
        updatedQuiz,
      }: {
        quizId: string;
        updatedQuiz: IGetQuizQuestion;
      }) => ({
        method: "PATCH",
        url: `/quiz/${quizId}`,
        body: updatedQuiz,
      }),
      invalidatesTags: ["quiz"],
    }),
  }),
});

export const { useUpdateQuizMutation } = quizApi;
