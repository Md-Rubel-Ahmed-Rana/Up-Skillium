import { ICreateEducation, IEducation } from "@/types/education.type";
import apiSlice from "../api/apiSlice";

const educationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEducationsByUser: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/education/by-user/${userId}`,
      }),
      providesTags: ["education"],
    }),
    getAllEducations: builder.query({
      query: () => ({
        method: "GET",
        url: `/education`,
      }),
      providesTags: ["education"],
    }),
    getSingleEducation: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/education/${id}`,
      }),
      providesTags: ["education"],
    }),
    addEducation: builder.mutation({
      query: ({ data }: { data: ICreateEducation }) => ({
        method: "POST",
        url: `/education/add`,
        body: data,
      }),
      invalidatesTags: ["education"],
    }),
    updateEducation: builder.mutation({
      query: ({ id, data }: { id: string; data: IEducation }) => ({
        method: "PATCH",
        url: `/education/${id}`,
        body: data,
      }),
      invalidatesTags: ["education"],
    }),
    deleteEducation: builder.mutation({
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `/education/${id}`,
      }),
      invalidatesTags: ["education"],
    }),
  }),
});

export const {
  useGetAllEducationsByUserQuery,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useGetAllEducationsQuery,
  useGetSingleEducationQuery,
} = educationApi;
