import apiSlice from "../api/apiSlice";

const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentCertificates: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/certificate/my-certificates/${userId}`,
      }),
      providesTags: [
        "lesson",
        "module",
        "course",
        "quiz-submission",
        "certificates",
      ] as any,
    }),
    getAllCertificates: builder.query({
      query: () => ({
        method: "GET",
        url: `/certificate`,
      }),
      providesTags: [
        "lesson",
        "module",
        "course",
        "quiz-submission",
        "certificates",
      ] as any,
    }),
  }),
});

export const { useGetStudentCertificatesQuery, useGetAllCertificatesQuery } =
  certificateApi;
