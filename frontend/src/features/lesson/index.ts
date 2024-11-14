/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILesson } from "@/types/lesson.type";
import apiSlice from "../api/apiSlice";

const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLessons: builder.query({
      query: () => ({
        method: "GET",
        url: `/lesson?limit=100&page=1`,
      }),
      providesTags: ["lesson"] as any,
    }),
    getSingleLesson: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `/lesson/${lessonId}`,
      }),
      providesTags: ["lesson"] as any,
    }),
    uploadLessonVideo: builder.mutation({
      query: ({ video }: { video: FormData }) => ({
        method: "PATCH",
        url: `/lesson/upload-video`,
        body: video,
      }),
      invalidatesTags: ["lesson"] as any,
    }),
    updateLesson: builder.mutation({
      query: ({ lessonId, data }: { lessonId: string; data: ILesson }) => ({
        method: "PATCH",
        url: `/lesson/${lessonId}`,
        body: data,
      }),
      invalidatesTags: ["lesson"] as any,
    }),
  }),
});

export const {
  useGetSingleLessonQuery,
  useGetAllLessonsQuery,
  useUploadLessonVideoMutation,
  useUpdateLessonMutation,
} = lessonApi;
