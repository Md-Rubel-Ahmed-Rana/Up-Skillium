import apiSlice from "../api/apiSlice";

const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myCourses: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/student/${userId}`,
      }),
    }),
    getAllStudents: builder.query({
      query: () => ({
        method: "GET",
        url: `/student`,
      }),
    }),
  }),
});

export const { useMyCoursesQuery, useGetAllStudentsQuery } = studentApi;
