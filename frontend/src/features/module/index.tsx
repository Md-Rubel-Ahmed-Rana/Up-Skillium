import { ICreateModule } from "@/types/module.type";
import apiSlice from "../api/apiSlice";

const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModulesByCourseId: builder.query({
      query: ({ courseId }: { courseId: string }) => ({
        method: "GET",
        url: `/module/classes/${courseId}`,
      }),
      providesTags: ["lesson"] as any,
    }),
    getAllModules: builder.query({
      query: ({
        searchText = "",
        filters = {},
        page = 1,
        limit = 100,
      }: {
        searchText?: string;
        filters?: Record<string, string>;
        page?: number;
        limit?: number;
      }) => ({
        method: "GET",
        url: `/module`,
        params: {
          searchText,
          page,
          limit,
          filters: JSON.stringify(filters),
        },
      }),
      providesTags: ["lesson", "module"],
    }),
    getAllModulesByInstructor: builder.query({
      query: ({
        instructorId,
        searchText = "",
        filters = {},
        page = 1,
        limit = 100,
      }: {
        instructorId: string;
        searchText?: string;
        filters?: Record<string, string>;
        page?: number;
        limit?: number;
      }) => ({
        method: "GET",
        url: `/module/by-instructor/modules/${instructorId}`,
        params: {
          searchText,
          page,
          limit,
          filters: JSON.stringify(filters),
        },
      }),
      providesTags: ["lesson", "module"],
    }),
    createModule: builder.mutation({
      query: ({ modules }: { modules: ICreateModule[] }) => ({
        method: "POST",
        url: `/module/create`,
        body: modules,
      }),
      invalidatesTags: ["lesson", "module"],
    }),
    updateModule: builder.mutation({
      query: ({
        moduleId,
        module,
      }: {
        moduleId: string;
        module: { title: string; serial: number };
      }) => ({
        method: "PATCH",
        url: `/module/${moduleId}`,
        body: module,
      }),
      invalidatesTags: ["lesson", "module"],
    }),
  }),
});

export const {
  useGetModulesByCourseIdQuery,
  useGetAllModulesQuery,
  useCreateModuleMutation,
  useGetAllModulesByInstructorQuery,
  useUpdateModuleMutation,
} = moduleApi;
