/* eslint-disable @typescript-eslint/no-explicit-any */
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
  }),
});

export const { useGetModulesByCourseIdQuery } = moduleApi;
