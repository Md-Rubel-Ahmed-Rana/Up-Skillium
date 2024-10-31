import apiSlice from "../api/apiSlice";

const courseOutlineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseOutlines: builder.query({
      query: () => ({
        method: "GET",
        url: `/course-outline`,
      }),
    }),
    getCourseOutlineByCourseId: builder.query({
      query: ({ courseId }: { courseId: string }) => ({
        method: "GET",
        url: `/course-outline/by-course/${courseId}`,
      }),
    }),
  }),
});

export const {
  useGetAllCourseOutlinesQuery,
  useGetCourseOutlineByCourseIdQuery,
} = courseOutlineApi;
