import { ICreateCertificate } from "@/types/certificate.type";
import apiSlice from "../api/apiSlice";

const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentCertificates: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/certificate/my-certificates/${userId}`,
      }),
      providesTags: ["certificates"] as any,
    }),
    getAllCertificates: builder.query({
      query: () => ({
        method: "GET",
        url: `/certificate`,
      }),
      providesTags: ["certificates"] as any,
    }),
    getSingleCertificate: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/certificate/${id}`,
      }),
      providesTags: ["certificates"] as any,
    }),
    createCertificate: builder.mutation({
      query: ({ data }: { data: ICreateCertificate }) => ({
        method: "POST",
        url: `/certificate/create`,
        body: data,
      }),
      invalidatesTags: ["certificates"] as any,
    }),
  }),
});

export const {
  useGetStudentCertificatesQuery,
  useGetAllCertificatesQuery,
  useGetSingleCertificateQuery,
  useCreateCertificateMutation,
} = certificateApi;
