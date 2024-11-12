/* eslint-disable @typescript-eslint/no-explicit-any */
import apiSlice from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: ({ searchText = "" }: { searchText?: string }) => ({
        method: "GET",
        url: `/course`,
        params: { searchText },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["course"] as any,
    }),
    getSingleCourse: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/course/${id}`,
      }),
      providesTags: ["course"] as any,
    }),
    updateCourseImage: builder.mutation({
      query: ({ courseId, image }: { courseId: string; image: FormData }) => ({
        method: "PATCH",
        url: `/course/change-course-image/${courseId}`,
        body: image,
      }),
      invalidatesTags: ["course"] as any,
    }),
    updateCourseIntroVideo: builder.mutation({
      query: ({ courseId, video }: { courseId: string; video: FormData }) => ({
        method: "PATCH",
        url: `/course/change-course-introductory-video/${courseId}`,
        body: video,
      }),
      invalidatesTags: ["course"] as any,
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useLazyGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useUpdateCourseImageMutation,
  useUpdateCourseIntroVideoMutation,
} = courseApi;
