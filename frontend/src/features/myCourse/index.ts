import apiSlice from "../api/apiSlice";

const myCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyCourses: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/my-course/${userId}`,
      }),
      providesTags: ["my-course"],
    }),
    getMySingleCourse: builder.query({
      query: ({ userId, courseId }: { userId: string; courseId: string }) => ({
        method: "GET",
        url: `/my-course/single/${userId}/${courseId}`,
      }),
      providesTags: ["my-course"],
    }),
    markLessonAsCompleted: builder.mutation({
      query: ({
        userId,
        courseId,
        lessonId,
      }: {
        userId: string;
        courseId: string;
        lessonId: string;
      }) => ({
        method: "POST",
        url: `/my-course/compete-lesson/${userId}/${courseId}/${lessonId}`,
      }),
      invalidatesTags: ["my-course"],
    }),
  }),
});

export const {
  useGetAllMyCoursesQuery,
  useGetMySingleCourseQuery,
  useMarkLessonAsCompletedMutation,
} = myCourseApi;
