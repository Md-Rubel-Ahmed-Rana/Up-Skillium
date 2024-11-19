import { ICourseOutlineModuleSerialUpdate } from "@/types/courseOutline.type";
import apiSlice from "../api/apiSlice";

const courseOutlineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseOutlines: builder.query({
      query: () => ({
        method: "GET",
        url: `/course-outline`,
      }),
      providesTags: ["course-outline"] as any,
    }),
    getCourseOutlineByCourseId: builder.query({
      query: ({ courseId }: { courseId: string }) => ({
        method: "GET",
        url: `/course-outline/by-course/${courseId}`,
      }),
      providesTags: ["course-outline"] as any,
    }),
    updateModuleName: builder.mutation({
      query: ({
        courseId,
        moduleId,
        updateName,
      }: {
        courseId: string;
        moduleId: string;
        updateName: string;
      }) => ({
        method: "PATCH",
        url: `/course-outline/update-module-name/${courseId}/${moduleId}`,
        body: { name: updateName },
      }),
      invalidatesTags: ["course-outline"] as any,
    }),
    updateCourseOutlineModuleSerial: builder.mutation({
      query: ({
        courseId,
        data,
      }: {
        courseId: string;
        data: ICourseOutlineModuleSerialUpdate;
      }) => ({
        method: "PATCH",
        url: `/course-outline/update-module-serial/${courseId}`,
        body: data,
      }),
      invalidatesTags: ["course-outline"] as any,
    }),
    deleteCourseOutlineModule: builder.mutation({
      query: ({
        courseId,
        moduleId,
      }: {
        courseId: string;
        moduleId: string;
      }) => ({
        method: "DELETE",
        url: `/course-outline/delete-module/${courseId}/${moduleId}`,
      }),
      invalidatesTags: ["course-outline"] as any,
    }),
  }),
});

export const {
  useGetAllCourseOutlinesQuery,
  useLazyGetAllCourseOutlinesQuery,
  useGetCourseOutlineByCourseIdQuery,
  useLazyGetCourseOutlineByCourseIdQuery,
  useUpdateModuleNameMutation,
  useUpdateCourseOutlineModuleSerialMutation,
  useDeleteCourseOutlineModuleMutation,
} = courseOutlineApi;
