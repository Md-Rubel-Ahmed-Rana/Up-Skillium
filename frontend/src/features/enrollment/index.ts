import apiSlice from "../api/apiSlice";

const enrollmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentEnrollments: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/enrollment/student/${userId}`,
      }),
    }),
    getStudentOrderHistory: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/enrollment/order-history/${userId}`,
      }),
    }),
  }),
});

export const { useGetStudentEnrollmentsQuery, useGetStudentOrderHistoryQuery } =
  enrollmentApi;
