import { ICreateLiveClass, IGetLiveClass } from "@/types/liveClass.type";
import apiSlice from "../api/apiSlice";

const liveClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLiveClass: builder.mutation({
      query: ({ data }: { data: ICreateLiveClass }) => ({
        method: "POST",
        url: `/live-class/create`,
        body: data,
      }),
      invalidatesTags: ["live-class"],
    }),
    getUpcomingLiveClassesByInstructor: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/live-class/instructor/classes/upcoming/${instructorId}`,
      }),
      providesTags: ["live-class"],
    }),

    getAllLiveClasses: builder.query({
      query: ({
        status,
      }: {
        status?: "upcoming" | "ongoing" | "completed" | "cancelled";
      }) => ({
        method: "GET",
        url: `/live-class`,
        params: { status },
      }),
      providesTags: ["live-class"],
    }),
    getCompletedLiveClassesByInstructor: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/live-class/instructor/classes/completed/${instructorId}`,
      }),
      providesTags: ["live-class"],
    }),
    getStudentLiveClasses: builder.query({
      query: ({ studentId }: { studentId: string }) => ({
        method: "GET",
        url: `/live-class/student/classes/${studentId}`,
      }),
      providesTags: ["live-class"],
    }),
    getSingleLiveClass: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/live-class/${id}`,
      }),
      providesTags: ["live-class"],
    }),
    deleteLiveClass: builder.mutation({
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `/live-class/${id}`,
      }),
      invalidatesTags: ["live-class"],
    }),
    updateLiveClass: builder.mutation({
      query: ({ id, data }: { id: string; data: IGetLiveClass }) => ({
        method: "PATCH",
        url: `/live-class/${id}`,
        body: data,
      }),
      invalidatesTags: ["live-class"],
    }),
  }),
});

export const {
  useCreateLiveClassMutation,
  useGetUpcomingLiveClassesByInstructorQuery,
  useGetCompletedLiveClassesByInstructorQuery,
  useGetAllLiveClassesQuery,
  useDeleteLiveClassMutation,
  useGetSingleLiveClassQuery,
  useUpdateLiveClassMutation,
  useGetStudentLiveClassesQuery,
} = liveClassApi;
