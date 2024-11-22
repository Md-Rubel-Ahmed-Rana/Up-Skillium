import apiSlice from "../api/apiSlice";

const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignments: builder.query({
      query: () => ({
        method: "GET",
        url: "/assignment",
      }),
      providesTags: ["assignment"],
    }),
  }),
});

export const { useGetAllAssignmentsQuery } = assignmentApi;
