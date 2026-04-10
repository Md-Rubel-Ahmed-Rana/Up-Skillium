import { useDeleteFeedbackMutation } from "@/features/review";
import { IReview } from "@/types/review.type";
import { DeleteOutlined } from "@ant-design/icons/lib";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  feedback: IReview;
};

const FeedbackDeleteButton = ({ feedback }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteFeedback, { isLoading }] = useDeleteFeedbackMutation();

  const handleDeleteFeedback = async () => {
    try {
      const result: any = await deleteFeedback({
        id: feedback?.id,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Feedback deleted successfully!"
        );
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete feedback."
        );
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(`Failed to delete feedback. Error: ${error?.message}`);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => setOpen(true)}
        className="bg-red-500 hover:bg-red-600"
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
      <Modal
        title="Delete Feedback"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        className="rounded-lg"
      >
        <div className="mb-4 text-red-600">
          <p className="text-lg font-medium">
            Are you sure you want to delete this feedback?
          </p>
          <p className="text-sm text-gray-600">
            This action cannot be undone. Once deleted, the feedback will be
            permanently removed.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            htmlType="button"
            onClick={() => setOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            className="bg-red-500 hover:bg-red-600 rounded-md"
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
            onClick={handleDeleteFeedback}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackDeleteButton;
