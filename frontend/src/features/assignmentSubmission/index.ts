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
    }),
  }),
});

export const { useSubmitAssignmentMutation } = assignmentSubmissionApi;
