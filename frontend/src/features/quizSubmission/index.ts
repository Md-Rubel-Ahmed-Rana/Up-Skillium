import apiSlice from "../api/apiSlice";

const quizSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubmittedQuizResult: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `quiz-submission/result/${lessonId}`,
      }),
      providesTags: ["lesson", "module", "course", "quiz-submission"],
    }),
    getAllSubmittedQuizzes: builder.query({
      query: () => ({
        method: "GET",
        url: `quiz-submission`,
      }),
      providesTags: ["lesson", "module", "course", "quiz-submission"],
    }),
  }),
});

export const {
  useGetSubmittedQuizResultQuery,
  useGetAllSubmittedQuizzesQuery,
} = quizSubmissionApi;
