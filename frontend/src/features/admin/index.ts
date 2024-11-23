import apiSlice from "../api/apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => ({
        method: "GET",
        url: `/admin`,
      }),
    }),
  }),
});

export const { useGetAllAdminsQuery } = adminApi;
