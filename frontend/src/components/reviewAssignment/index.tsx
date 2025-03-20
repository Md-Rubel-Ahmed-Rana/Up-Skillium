import {
  useGetSubmittedAssignmentQuery,
  useSubmitAssignmentFeedbackMutation,
} from "@/features/assignmentSubmission";
import {
  IAssignmentSubmission,
  IReviewAssignment,
} from "@/types/assignmentSubmission.type";
import { Button, Card, Input, Skeleton } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const { TextArea } = Input;

const ReviewAssignment = () => {
  const { query, back } = useRouter();
  const lessonTitle = query?.lessonTitle as string;
  const lessonId = query?.lessonId as string;
  const studentId = query?.studentId as string;

  const { data, isLoading } = useGetSubmittedAssignmentQuery({
    userId: studentId,
    lessonId,
  });

  const [submitFeedback, { isLoading: isSubmitting }] =
    useSubmitAssignmentFeedbackMutation();

  const assignment = data?.data as IAssignmentSubmission;

  const [fullMarks, setFullMarks] = useState<number | 0>(0);
  const [yourMarks, setYourMarks] = useState<number | 0>(0);
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async () => {
    if (!yourMarks || yourMarks < 0 || yourMarks > fullMarks) {
      return toast.error("Please enter valid marks");
    }

    const reviewData: IReviewAssignment = {
      ...assignment,
      fullMark: fullMarks,
      yourMark: yourMarks,
      feedback,
      lesson: lessonId,
      user: studentId,
      checkedAt: new Date(),
      status: "checked",
    };

    try {
      const res: any = await submitFeedback({ data: reviewData });
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message || "Feedback submitted successfully!");
        back();
      } else {
        toast.error(
          res?.error?.message ||
            res?.error?.data?.message ||
            res?.data?.error?.message ||
            "Failed to submit feedback"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit feedback");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-5 flex flex-col gap-4">
          <Skeleton paragraph={{ rows: 5 }} active />
          <Skeleton paragraph={{ rows: 5 }} active />
          <Skeleton paragraph={{ rows: 5 }} active />
        </div>
      ) : (
        <>
          {!assignment ? (
            <div className="flex justify-center items-center">
              <p className="text-center text-lg text-red-500">
                Assignment not found
              </p>
              ;
            </div>
          ) : (
            <Card title={`Review Assignment: ${lessonTitle}`}>
              <p className="text-lg font-semibold">
                Student: {assignment?.user?.name}
              </p>
              <p>
                Status:{" "}
                <span className="font-semibold text-blue-600">
                  {assignment?.status}
                </span>
              </p>
              <p>
                Submitted At:{" "}
                {new Date(assignment.submittedAt).toLocaleString()}
              </p>
              {assignment?.isLate && (
                <p className="text-red-500">Late Submission</p>
              )}

              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold">Submission</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: assignment?.submission?.content,
                  }}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium">Full Marks</label>
                <Input
                  type="number"
                  value={fullMarks}
                  onChange={(e) => setFullMarks(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium">
                  Marks (out of {fullMarks}):
                </label>
                <Input
                  type="number"
                  value={yourMarks}
                  onChange={(e) => setYourMarks(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium">Feedback:</label>
                <TextArea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <Button
                type="primary"
                className="mt-4"
                loading={isSubmitting}
                disabled={isSubmitting}
                iconPosition="end"
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting" : "Submit Feedback"}
              </Button>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default ReviewAssignment;
