import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeProfilePicture: builder.mutation({
      query: ({ id, image }: { id: string; image: FormData }) => ({
        method: "PATCH",
        url: `/user/change-profile-picture/${id}`,
        body: image,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        method: "GET",
        url: `/user`,
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/user/${userId}`,
      }),
      providesTags: ["user"],
    }),
    updateUserBasicInfo: builder.mutation({
      query: ({
        id,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
      }: {
        id: string;
        email: string;
        phoneNumber: string;
        gender: string;
        dateOfBirth: Date | null;
      }) => ({
        method: "PATCH",
        url: `/user/update-basic-info/${id}`,
        body: { email, phoneNumber, dateOfBirth, gender },
      }),
      invalidatesTags: ["user"],
    }),
    updateUserAddress: builder.mutation({
      query: ({
        id,
        street,
        city,
        state,
        country,
      }: {
        id: string;
        street: string;
        city: string;
        state: string;
        country: string;
      }) => ({
        method: "PATCH",
        url: `/user/update-address/${id}`,
        body: { street, city, state, country },
      }),
      invalidatesTags: ["user"],
    }),
    updateEmergencyContact: builder.mutation({
      query: ({
        id,
        name,
        relationship,
        phone,
      }: {
        id: string;
        name: string;
        relationship: string;
        phone: string;
      }) => ({
        method: "PATCH",
        url: `/user/update-emergency-contact/${id}`,
        body: { name, relationship, phone },
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: ({
        userId,
        passwords,
      }: {
        userId: string;
        passwords: { oldPassword: string; newPassword: string };
      }) => ({
        method: "PATCH",
        url: `/user/change-password/${userId}`,
        body: passwords,
      }),
      invalidatesTags: ["user"],
    }),
    activeInactiveUserAccount: builder.mutation({
      query: ({
        userId,
        status,
      }: {
        userId: string;
        status: "active" | "inactive";
      }) => ({
        method: "PATCH",
        url: `/user/update-status/${userId}/${status}`,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useChangeProfilePictureMutation,
  useUpdateUserBasicInfoMutation,
  useUpdateUserAddressMutation,
  useUpdateEmergencyContactMutation,
  useGetAllUsersQuery,
  useChangePasswordMutation,
  useGetSingleUserQuery,
  useActiveInactiveUserAccountMutation,
} = userApi;
