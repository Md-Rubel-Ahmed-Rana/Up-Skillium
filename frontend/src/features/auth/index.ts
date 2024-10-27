import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth",
      }),
    }),
    userLogin: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        method: "POST",
        url: "/auth/login",
        body: { email, password },
      }),
    }),
  }),
});

export const { useGetLoggedInUserQuery, useUserLoginMutation } = authApi;
