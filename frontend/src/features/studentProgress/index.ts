import apiSlice from "../api/apiSlice";

const studentProgressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: ({ userId, courseId }: { userId: string; courseId: string }) => ({
        method: "GET",
        url: `/student-progress/course/${userId}/${courseId}`,
      }),
    }),
  }),
});

export const { useGetCourseProgressQuery } = studentProgressApi;
