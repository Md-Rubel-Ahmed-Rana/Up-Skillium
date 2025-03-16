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
    verifyResetToken: builder.query({
      query: ({ token }: { token: string }) => ({
        method: "GET",
        url: `/auth/verify-reset-password-token?token=${token}`,
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
    forgetPassword: builder.mutation({
      query: ({ email }: { email: string }) => ({
        method: "POST",
        url: "/auth/forget-password",
        body: { email },
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
      invalidatesTags: ["user", "instructor"],
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
  useForgetPasswordMutation,
  useVerifyResetTokenQuery,
} = authApi;
