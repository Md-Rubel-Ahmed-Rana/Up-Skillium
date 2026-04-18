import apiSlice from "../api/apiSlice";

const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAddress: builder.query({
      query: ({ role }: { role: string }) => ({
        url: `/${role}/address/me`,
      }),
      providesTags: ["address"],
    }),
  }),
});

export const { useGetUserAddressQuery } = addressApi;
