/* eslint-disable @typescript-eslint/no-explicit-any */
import apiSlice from "../api/apiSlice";

const studentProgressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: ({ userId, courseId }: { userId: string; courseId: string }) => ({
        method: "GET",
        url: `/student-progress/course/${userId}/${courseId}`,
      }),
      providesTags: ["lesson", "module", "course"] as any,
    }),
    lessonMarkAsComplete: builder.mutation({
      query: ({
        userId,
        courseId,
        moduleId,
        lessonId,
      }: {
        userId: string;
        courseId: string;
        moduleId: string;
        lessonId: string;
      }) => ({
        method: "PATCH",
        url: `/student-progress/users/${userId}/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/complete`,
      }),
      invalidatesTags: ["lesson", "module", "course"] as any,
    }),
  }),
});

export const { useGetCourseProgressQuery, useLessonMarkAsCompleteMutation } =
  studentProgressApi;
