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
    getStudentMyCourses: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/student-progress/courses/${userId}`,
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

export const {
  useGetCourseProgressQuery,
  useLessonMarkAsCompleteMutation,
  useGetStudentMyCoursesQuery,
} = studentProgressApi;
