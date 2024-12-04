import apiSlice from "../api/apiSlice";

const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstructors: builder.query({
      query: () => ({
        method: "GET",
        url: `/instructor`,
      }),
      providesTags: ["instructor"] as any,
    }),
    getMyStudents: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/instructor/my-students/${instructorId}`,
      }),
      providesTags: ["instructor"] as any,
    }),
  }),
});

export const { useGetAllInstructorsQuery, useGetMyStudentsQuery } =
  instructorApi;
