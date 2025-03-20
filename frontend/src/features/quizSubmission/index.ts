import apiSlice from "../api/apiSlice";

const quizSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubmittedQuizResult: builder.query({
      query: ({ userId, lessonId }: { userId: string; lessonId: string }) => ({
        method: "GET",
        url: `/quiz-submission/result/${userId}/${lessonId}`,
      }),
      providesTags: ["lesson", "module", "course", "quiz-submission", "quiz"],
    }),
    submitQuiz: builder.mutation({
      query: ({
        userId,
        lessonId,
        data,
      }: {
        userId: string;
        lessonId: string;
        data: { id: string; answer: string }[];
      }) => ({
        method: "POST",
        url: `/quiz-submission/submit/${userId}/${lessonId}`,
        body: data,
      }),
      invalidatesTags: [
        "lesson",
        "module",
        "course",
        "quiz-submission",
        "quiz",
        "assignment",
        "my-course",
      ],
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
  useSubmitQuizMutation,
} = quizSubmissionApi;
