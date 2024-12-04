import { IGetLesson as IAssignment } from "@/types/lesson.type";
import apiSlice from "../api/apiSlice";

const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignments: builder.query({
      query: () => ({
        method: "GET",
        url: "/assignment",
      }),
      providesTags: ["assignment"],
    }),
    getSingleAssignments: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/assignment/${id}`,
      }),
      providesTags: ["assignment"],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, data }: { id: string; data: IAssignment }) => ({
        method: "PATCH",
        url: `/assignment/${id}`,
        body: data,
      }),
      invalidatesTags: ["assignment"],
    }),
    deleteAssignment: builder.mutation({
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `/assignment/${id}`,
      }),
      invalidatesTags: ["assignment"],
    }),
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useUpdateAssignmentMutation,
  useGetSingleAssignmentsQuery,
  useDeleteAssignmentMutation,
} = assignmentApi;
