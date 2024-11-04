import apiSlice from "../api/apiSlice";

const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myCourses: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/student/${userId}`,
      }),
    }),
  }),
});

export const { useMyCoursesQuery } = studentApi;
