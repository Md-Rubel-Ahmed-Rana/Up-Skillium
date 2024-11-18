import {
  ICourseBasicInfo,
  ICourseTagsTechsUpdate,
  IPriceUpdate,
} from "@/types/course.type";
import apiSlice from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ course }: { course: FormData }) => ({
        method: "POST",
        url: `/course/create`,
        body: course,
      }),
      invalidatesTags: ["course"],
    }),
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

    getInstructorCourses: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/course/instructor/${instructorId}`,
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
    updateCourseBasicInfo: builder.mutation({
      query: ({
        courseId,
        data,
      }: {
        courseId: string;
        data: ICourseBasicInfo;
      }) => ({
        method: "PATCH",
        url: `/course/update-basic-info/${courseId}`,
        body: data,
      }),
      invalidatesTags: ["course"] as any,
    }),
    updateCoursePrice: builder.mutation({
      query: ({
        courseId,
        data,
      }: {
        courseId: string;
        data: IPriceUpdate;
      }) => ({
        method: "PATCH",
        url: `/course/update-price/${courseId}`,
        body: data,
      }),
      invalidatesTags: ["course"] as any,
    }),
    updateCourseTagsTechs: builder.mutation({
      query: ({
        courseId,
        data,
      }: {
        courseId: string;
        data: ICourseTagsTechsUpdate;
      }) => ({
        method: "PATCH",
        url: `/course/update-tags-techs/${courseId}`,
        body: data,
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
  useUpdateCourseBasicInfoMutation,
  useUpdateCoursePriceMutation,
  useUpdateCourseTagsTechsMutation,
  useGetInstructorCoursesQuery,
  useCreateCourseMutation,
} = courseApi;
