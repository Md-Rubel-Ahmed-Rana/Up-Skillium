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
      query: ({
        searchText = "",
        filters = {},
        page = 1,
        limit = 10,
      }: {
        searchText?: string;
        filters?: Record<string, string>;
        page?: number;
        limit?: number;
      }) => ({
        method: "GET",
        url: `/course`,
        params: {
          searchText,
          page,
          limit,
          filters: JSON.stringify(filters),
        },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["course"],
    }),

    getAllPublishedCourses: builder.query({
      query: ({
        searchText = "",
        filters,
        page = 1,
        limit = 6,
      }: {
        searchText?: string;
        filters?: Record<any, any>;
        page?: number;
        limit?: number;
      }) => ({
        method: "GET",
        url: `/course/published/courses`,
        params: { searchText, filters: JSON.stringify(filters), page, limit },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["course"],
    }),
    getRelatedCourses: builder.query({
      query: ({ relatableText = "" }: { relatableText: string }) => ({
        method: "GET",
        url: `/course/related-courses`,
        params: { relatableText },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["course"],
    }),
    getSingleCourse: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/course/${id}`,
      }),
      providesTags: ["course"],
    }),

    getInstructorCourses: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/course/instructor/${instructorId}`,
      }),
      providesTags: ["course"],
    }),

    updateCourseImage: builder.mutation({
      query: ({ courseId, image }: { courseId: string; image: FormData }) => ({
        method: "PATCH",
        url: `/course/change-course-image/${courseId}`,
        body: image,
      }),
      invalidatesTags: ["course"],
    }),
    updateCourseIntroVideo: builder.mutation({
      query: ({ courseId, video }: { courseId: string; video: FormData }) => ({
        method: "PATCH",
        url: `/course/change-course-introductory-video/${courseId}`,
        body: video,
      }),
      invalidatesTags: ["course"],
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
      invalidatesTags: ["course"],
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
      invalidatesTags: ["course"],
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
      invalidatesTags: ["course"],
    }),
    reAssignInstructor: builder.mutation({
      query: ({
        courseId,
        instructorId,
      }: {
        courseId: string;
        instructorId: string;
      }) => ({
        method: "PATCH",
        url: `course/update-instructor/${courseId}/${instructorId}`,
      }),
      invalidatesTags: ["course", "instructor"],
    }),
    getCoursesByCategory: builder.query({
      query: ({ category }: { category: string }) => ({
        method: "GET",
        url: `/course/category/courses/${category}`,
      }),
      providesTags: ["course"],
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
  useGetAllPublishedCoursesQuery,
  useLazyGetAllPublishedCoursesQuery,
  useReAssignInstructorMutation,
  useGetCoursesByCategoryQuery,
  useGetRelatedCoursesQuery,
} = courseApi;
