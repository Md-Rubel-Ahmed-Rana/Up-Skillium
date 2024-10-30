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
  }),
});

export const {
  useChangeProfilePictureMutation,
  useUpdateUserBasicInfoMutation,
} = userApi;
