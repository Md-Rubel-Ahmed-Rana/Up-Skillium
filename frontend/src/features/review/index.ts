import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        method: "GET",
        url: `/review`,
      }),
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewApi;
