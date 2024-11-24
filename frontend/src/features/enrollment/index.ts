import apiSlice from "../api/apiSlice";

const enrollmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentEnrollments: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/enrollment/student/${userId}`,
      }),
    }),
    getAllEnrollments: builder.query({
      query: () => ({
        method: "GET",
        url: `/enrollment/`,
      }),
    }),
    getStudentOrderHistory: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/enrollment/student-order-history/${userId}`,
      }),
    }),
    getAllOrderHistory: builder.query({
      query: () => ({
        method: "GET",
        url: `/enrollment/order-history`,
      }),
    }),
  }),
});

export const {
  useGetStudentEnrollmentsQuery,
  useGetStudentOrderHistoryQuery,
  useGetAllEnrollmentsQuery,
  useGetAllOrderHistoryQuery,
} = enrollmentApi;
