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
      query: ({ instructorUserId }: { instructorUserId: string }) => ({
        method: "GET",
        url: `/instructor/my-students/${instructorUserId}`,
      }),
      providesTags: ["instructor"] as any,
    }),
  }),
});

export const { useGetAllInstructorsQuery, useGetMyStudentsQuery } =
  instructorApi;
