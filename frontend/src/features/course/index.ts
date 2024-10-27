import apiSlice from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        method: "GET",
        url: "/course",
      }),
    }),
  }),
});

export const { useGetAllCoursesQuery } = courseApi;
