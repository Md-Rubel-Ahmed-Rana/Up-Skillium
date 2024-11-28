import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetSingleCourseQuery } from "@/features/course";
import { useAddFeedbackMutation } from "@/features/review";
import { ICourse } from "@/types/course.type";
import { IAddReview } from "@/types/review.type";
import { IUser } from "@/types/user.type";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { Button, Input, Modal, Rate } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import FeedbackButton from "./FeedbackButton";

const { TextArea } = Input;

const FeedbackModal = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"Course" | "User">("Course");
  const [addReview, { isLoading }] = useAddFeedbackMutation();

  const handleSubmit = async () => {
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide a rating and feedback.");
      return;
    }
    const review: IAddReview = {
      rating,
      feedback,
      reviewer: user?.id,
      reviewToModel: feedbackType,
      reviewTo: feedbackType === "Course" ? course?.id : course?.instructor?.id,
    };

    try {
      const result: any = await addReview({ data: review });
      if (result?.data?.statusCode === 201) {
        setRating(0);
        setFeedback("");
        setIsOpen(false);
        toast.success(result?.data?.message || "Review added successfully.");
      } else {
        handleValidationErrors(result);
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to add review."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to add review. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 my-4">
        <FeedbackButton
          setOpen={setIsOpen}
          setTitle={setTitle}
          buttonType="primary"
          feedbackType="Course"
          setFeedbackType={setFeedbackType}
        />
        <FeedbackButton
          setOpen={setIsOpen}
          setTitle={setTitle}
          buttonType="default"
          feedbackType="Instructor"
          setFeedbackType={setFeedbackType}
        />
      </div>
      <Modal
        title={`Feedback to ${title}`}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        maskClosable={!isLoading}
        closable={!isLoading}
      >
        <div className="flex flex-col gap-4">
          {feedbackType === "User" && (
            <p className="text-gray-500 font-sans m-0 p-0 text-xs">
              Instructor feedbacks only shown to admins.
            </p>
          )}
          <div className="flex flex-col items-start">
            <p className="font-semibold">Rate your experience:</p>
            <Rate onChange={(value) => setRating(value)} value={rating} />
          </div>

          <div>
            <p className="font-semibold">Your Feedback:</p>
            <TextArea
              rows={4}
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            disabled={rating === 0 || feedback.trim() === "" || isLoading}
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackModal;
