/* eslint-disable @typescript-eslint/no-explicit-any */
import apiSlice from "../api/apiSlice";

const quizSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubmittedQuizResult: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `quiz-submission/result/${lessonId}`,
      }),
      providesTags: ["lesson", "module", "course", "quiz-submission"] as any,
    }),
  }),
});

export const { useGetSubmittedQuizResultQuery } = quizSubmissionApi;
