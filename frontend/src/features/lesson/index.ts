import {
  ICreateAssignmentOrInstructionLesson,
  ICreateQuizLesson,
  ILesson,
} from "@/types/lesson.type";
import { IQuizQuestion } from "@/types/quiz.type";
import apiSlice from "../api/apiSlice";

const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLessons: builder.query({
      query: () => ({
        method: "GET",
        url: `/lesson?limit=100&page=1`,
      }),
      providesTags: ["lesson"],
    }),
    getAllLessonsByInstructor: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/lesson/by-instructor/lessons/${instructorId}?limit=100&page=1`,
      }),
      providesTags: ["lesson"],
    }),
    getAllQuizzesByInstructor: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/lesson/by-instructor/quizzes/${instructorId}`,
      }),
      providesTags: ["lesson"],
    }),
    getAllAssignmentByInstructor: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/lesson/by-instructor/assignments/${instructorId}`,
      }),
      providesTags: ["lesson"],
    }),
    getSingleLesson: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `/lesson/${lessonId}`,
      }),
      providesTags: ["lesson"],
    }),
    getLessonsByModuleId: builder.query({
      query: ({ moduleId }: { moduleId: string }) => ({
        method: "GET",
        url: `/lesson/module/${moduleId}`,
      }),
      providesTags: ["lesson"],
    }),
    getSingleLessonWithQuizCorrectAnswer: builder.query({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "GET",
        url: `/lesson/quiz-correct-answer/${lessonId}`,
      }),
      providesTags: ["lesson"],
    }),
    uploadLessonVideo: builder.mutation({
      query: ({ video }: { video: FormData }) => ({
        method: "PATCH",
        url: `/lesson/upload-video`,
        body: video,
      }),
      invalidatesTags: ["lesson"],
    }),
    updateLesson: builder.mutation({
      query: ({ lessonId, data }: { lessonId: string; data: ILesson }) => ({
        method: "PATCH",
        url: `/lesson/${lessonId}`,
        body: data,
      }),
      invalidatesTags: ["lesson"],
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
      invalidatesTags: ["lesson"],
    }),
    deleteLesson: builder.mutation({
      query: ({ lessonId }: { lessonId: string }) => ({
        method: "DELETE",
        url: `/lesson/${lessonId}`,
      }),
      invalidatesTags: ["lesson"],
    }),
    createVideoLesson: builder.mutation({
      query: ({ data }: { data: FormData }) => ({
        method: "POST",
        url: `/lesson/create/type/video`,
        body: data,
      }),
      invalidatesTags: ["lesson"],
    }),
    createAssignmentOrInstructionLesson: builder.mutation({
      query: ({ data }: { data: ICreateAssignmentOrInstructionLesson }) => ({
        method: "POST",
        url: `/lesson/create/type/${data?.type}`,
        body: data,
      }),
      invalidatesTags: ["lesson"],
    }),
    createQuizLesson: builder.mutation({
      query: ({ data }: { data: ICreateQuizLesson }) => ({
        method: "POST",
        url: `/lesson/create/type/quiz`,
        body: data,
      }),
      invalidatesTags: ["lesson"],
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
  useCreateVideoLessonMutation,
  useCreateAssignmentOrInstructionLessonMutation,
  useCreateQuizLessonMutation,
  useGetAllLessonsByInstructorQuery,
  useGetAllQuizzesByInstructorQuery,
  useGetAllAssignmentByInstructorQuery,
} = lessonApi;
