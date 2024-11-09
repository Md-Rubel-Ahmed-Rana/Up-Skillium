/* eslint-disable @typescript-eslint/no-explicit-any */
import apiSlice from "../api/apiSlice";

const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentCertificates: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `certificate/my-certificates/${userId}`,
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

export const { useGetStudentCertificatesQuery } = certificateApi;
