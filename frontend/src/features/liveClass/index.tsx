import { ICreateLiveClass } from "@/types/liveClass.type";
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
      query: () => ({
        method: "GET",
        url: `/live-class`,
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
  }),
});

export const {
  useCreateLiveClassMutation,
  useGetUpcomingLiveClassesByInstructorQuery,
  useGetCompletedLiveClassesByInstructorQuery,
  useGetAllLiveClassesQuery,
} = liveClassApi;
