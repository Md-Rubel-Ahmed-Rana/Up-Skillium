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
  }),
});

export const { useChangeProfilePictureMutation } = userApi;
