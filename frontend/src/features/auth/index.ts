import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth",
      }),
      providesTags: ["user"],
    }),
    userLogin: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        method: "POST",
        url: "/auth/login",
        body: { email, password },
      }),
      invalidatesTags: ["user"],
    }),
    userRegister: builder.mutation({
      query: ({
        name,
        email,
        role,
        password,
      }: {
        name: string;
        email: string;
        role: string;
        password: string;
      }) => ({
        method: "POST",
        url: "/auth/register",
        body: { name, email, role, password },
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        method: "DELETE",
        url: "/auth/logout",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useUserLoginMutation,
  useLogoutMutation,
  useUserRegisterMutation,
} = authApi;
