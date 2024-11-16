import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        method: "GET",
        url: `/review`,
      }),
      providesTags: ["feedback"],
    }),
    updateFeedback: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { feedback: string; rating: number };
      }) => ({
        method: "PATCH",
        url: `/review/${id}`,
        body: data,
      }),
      invalidatesTags: ["feedback"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useUpdateFeedbackMutation } = reviewApi;
