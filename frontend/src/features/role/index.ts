import apiSlice from "../api/apiSlice";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        method: "GET",
        url: `/role`,
      }),
    }),
  }),
});

export const { useGetAllRolesQuery } = roleApi;
