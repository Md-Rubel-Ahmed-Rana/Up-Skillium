import {
  ICourseOutlineModuleSerialUpdate,
  ICreateOutline,
  IUpdateModuleOutline,
} from "@/types/courseOutline.type";
import apiSlice from "../api/apiSlice";

const courseOutlineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseOutlines: builder.query({
      query: () => ({
        method: "GET",
        url: `/course-outline`,
      }),
      providesTags: ["course-outline"],
    }),
    getCourseOutlineByCourseId: builder.query({
      query: ({ courseId }: { courseId: string }) => ({
        method: "GET",
        url: `/course-outline/by-course/${courseId}`,
      }),
      providesTags: ["course-outline"],
    }),
    getSingleCourseOutline: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/course-outline/${id}`,
      }),
      providesTags: ["course-outline"],
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
      invalidatesTags: ["course-outline"],
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
      invalidatesTags: ["course-outline"],
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
      invalidatesTags: ["course-outline"],
    }),
    createCourseOutline: builder.mutation({
      query: ({ data }: { data: ICreateOutline }) => ({
        method: "POST",
        url: `/course-outline/create`,
        body: data,
      }),
      invalidatesTags: ["course-outline"],
    }),
    updateOutlineModules: builder.mutation({
      query: ({
        id,
        modules,
      }: {
        id: string;
        modules: IUpdateModuleOutline[];
      }) => ({
        method: "PATCH",
        url: `/course-outline/${id}`,
        body: modules,
      }),
      invalidatesTags: ["course-outline"],
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
  useCreateCourseOutlineMutation,
  useGetSingleCourseOutlineQuery,
  useUpdateOutlineModulesMutation,
} = courseOutlineApi;
