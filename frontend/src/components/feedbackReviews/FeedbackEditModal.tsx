import { useUpdateFeedbackMutation } from "@/features/review";
import { IReview } from "@/types/review.type";
import { Button, Form, Input, Modal, Rate } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  feedback: IReview;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const FeedbackEditModal = ({ feedback, open, setOpen }: Props) => {
  const [form] = Form.useForm();
  const [updateFeedback, { isLoading }] = useUpdateFeedbackMutation();

  const handleSaveChanges = async (values: {
    feedback: string;
    rating: number;
  }) => {
    try {
      const result: any = await updateFeedback({
        id: feedback?.id,
        data: values,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Feedback updated successfully!"
        );
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update feedback."
        );
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(`Failed to edit feedback. Error: ${error?.message}`);
      setOpen(false);
    }
  };

  return (
    <Modal
      title="Edit Feedback"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="rounded-lg"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          feedback: feedback?.feedback,
          rating: feedback?.rating,
        }}
        onFinish={handleSaveChanges}
      >
        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[
            { required: true, message: "Please enter your feedback!" },
            { max: 200, message: "Feedback cannot exceed 200 characters." },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Write your feedback here..."
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please provide a rating!" }]}
        >
          <Rate />
        </Form.Item>

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
            className="bg-blue-500 hover:bg-blue-600 rounded-md"
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FeedbackEditModal;
