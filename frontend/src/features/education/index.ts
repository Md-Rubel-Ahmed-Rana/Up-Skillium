import apiSlice from "../api/apiSlice";

const educationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEducationsByUser: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/education/by-user/${userId}`,
      }),
      providesTags: ["education"],
    }),
  }),
});

export const { useGetAllEducationsByUserQuery } = educationApi;
