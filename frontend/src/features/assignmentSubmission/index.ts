import apiSlice from "../api/apiSlice";

const assignmentSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitAssignment: builder.mutation({
      query: ({
        formData,
        userId,
        courseId,
        moduleId,
        lessonId,
      }: {
        formData: {
          submission: { content: string };
          userId: string;
          lessonId: string;
        };
        userId: string;
        courseId: string;
        moduleId: string;
        lessonId: string;
      }) => ({
        method: "POST",
        url: `/assignment-submission/submit/${userId}/${courseId}/${moduleId}/${lessonId}`,
        body: formData,
      }),
      invalidatesTags: ["assignment", "assignment-submission"],
    }),
    getSubmittedAssignment: builder.query({
      query: ({ userId, lessonId }: { userId: string; lessonId: string }) => ({
        method: "GET",
        url: `/assignment-submission/by-lesson/${userId}/${lessonId}`,
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getAllReviewedAssignments: builder.query({
      query: () => ({
        method: "GET",
        url: "/assignment-submission/reviewed",
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getAllPendingAssignments: builder.query({
      query: () => ({
        method: "GET",
        url: "/assignment-submission/pending",
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
  }),
});

export const {
  useSubmitAssignmentMutation,
  useGetSubmittedAssignmentQuery,
  useGetAllPendingAssignmentsQuery,
  useGetAllReviewedAssignmentsQuery,
} = assignmentSubmissionApi;
