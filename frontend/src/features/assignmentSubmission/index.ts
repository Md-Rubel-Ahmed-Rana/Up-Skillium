import { IReviewAssignment } from "@/types/assignmentSubmission.type";
import apiSlice from "../api/apiSlice";

const assignmentSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitAssignment: builder.mutation({
      query: ({
        user,
        lesson,
        submission,
      }: {
        user: string;
        lesson: string;
        submission: { content: string; file?: any };
      }) => ({
        method: "POST",
        url: `/assignment-submission/submit`,
        body: { user, lesson, submission },
      }),
      invalidatesTags: ["assignment", "assignment-submission"],
    }),
    submitAssignmentFeedback: builder.mutation({
      query: ({ data }: { data: IReviewAssignment }) => ({
        method: "PATCH",
        url: `/assignment-submission/review`,
        body: data,
      }),
      invalidatesTags: ["assignment", "assignment-submission"],
    }),
    getSubmittedAssignment: builder.query({
      query: ({ userId, lessonId }: { userId: string; lessonId: string }) => ({
        method: "GET",
        url: `/assignment-submission/by-lesson/${userId}/${lessonId}`,
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getSingleAssignmentSubmission: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `/assignment-submission/single/${id}`,
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getAllReviewedAssignments: builder.query({
      query: () => ({
        method: "GET",
        url: "/assignment-submission/reviewed",
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getAllPendingAssignments: builder.query({
      query: () => ({
        method: "GET",
        url: "/assignment-submission/pending",
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getInstructorPendingAssignments: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/assignment-submission/by-instructor/pending/${instructorId}`,
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
    getInstructorCompleteAssignments: builder.query({
      query: ({ instructorId }: { instructorId: string }) => ({
        method: "GET",
        url: `/assignment-submission/by-instructor/completed/${instructorId}`,
      }),
      providesTags: ["assignment", "assignment-submission"],
    }),
  }),
});

export const {
  useSubmitAssignmentMutation,
  useGetSubmittedAssignmentQuery,
  useGetAllPendingAssignmentsQuery,
  useGetAllReviewedAssignmentsQuery,
  useGetInstructorPendingAssignmentsQuery,
  useGetInstructorCompleteAssignmentsQuery,
  useGetSingleAssignmentSubmissionQuery,
  useSubmitAssignmentFeedbackMutation,
} = assignmentSubmissionApi;
