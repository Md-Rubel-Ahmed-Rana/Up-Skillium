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
      query: () => ({
        method: "GET",
        url: `/module`,
      }),
      providesTags: ["lesson", "module"],
    }),
  }),
});

export const { useGetModulesByCourseIdQuery, useGetAllModulesQuery } =
  moduleApi;
