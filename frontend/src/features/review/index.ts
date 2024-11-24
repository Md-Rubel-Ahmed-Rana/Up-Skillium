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
    getInstructorReviews: builder.query({
      query: () => ({
        method: "GET",
        url: `/review/instructor`,
      }),
      providesTags: ["feedback"],
    }),
    getCourseReviews: builder.query({
      query: () => ({
        method: "GET",
        url: `/review/course`,
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
    deleteFeedback: builder.mutation({
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `/review/${id}`,
      }),
      invalidatesTags: ["feedback"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetCourseReviewsQuery,
  useGetInstructorReviewsQuery,
} = reviewApi;
