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
  }),
});

export const { useGetAllInstructorsQuery } = instructorApi;
