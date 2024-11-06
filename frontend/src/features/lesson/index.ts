import apiSlice from "../api/apiSlice";

const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleLesson: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `/lesson/${lessonId}`,
      }),
    }),
  }),
});

export const { useGetSingleLessonQuery } = lessonApi;
