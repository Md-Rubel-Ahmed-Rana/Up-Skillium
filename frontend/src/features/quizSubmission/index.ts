import apiSlice from "../api/apiSlice";

const quizSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubmittedQuizResult: builder.query({
      query: ({ lessonId, userId }: { lessonId: string; userId: string }) => ({
        method: "GET",
        url: `/quiz-submission/result/${userId}/${lessonId}`,
      }),
      providesTags: ["lesson", "module", "course", "quiz-submission", "quiz"],
    }),
    getAllSubmittedQuizzes: builder.query({
      query: () => ({
        method: "GET",
        url: `/quiz-submission`,
      }),
      providesTags: ["lesson", "module", "course", "quiz-submission"],
    }),
  }),
});

export const {
  useGetSubmittedQuizResultQuery,
  useGetAllSubmittedQuizzesQuery,
} = quizSubmissionApi;
