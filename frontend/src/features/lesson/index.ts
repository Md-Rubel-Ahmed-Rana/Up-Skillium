import { ILesson } from "@/types/lesson.type";
import { IQuizQuestion } from "@/types/quiz.type";
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
    getLessonsByModuleId: builder.query({
      query: ({ moduleId }: { moduleId: string }) => ({
        method: "GET",
        url: `/lesson/module/${moduleId}`,
      }),
      providesTags: ["lesson"] as any,
    }),
    getSingleLessonWithQuizCorrectAnswer: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `/lesson/quiz-correct-answer/${lessonId}`,
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
    updateLessonQuizQuestions: builder.mutation({
      query: ({
        lessonId,
        quizzes,
      }: {
        lessonId: string;
        quizzes: IQuizQuestion[];
      }) => ({
        method: "PATCH",
        url: `/lesson/update-quizzes/${lessonId}`,
        body: quizzes,
      }),
      invalidatesTags: ["lesson"] as any,
    }),
    deleteLesson: builder.mutation({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "DELETE",
        url: `/lesson/${lessonId}`,
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
  useDeleteLessonMutation,
  useUpdateLessonQuizQuestionsMutation,
  useGetSingleLessonWithQuizCorrectAnswerQuery,
  useGetLessonsByModuleIdQuery,
} = lessonApi;
