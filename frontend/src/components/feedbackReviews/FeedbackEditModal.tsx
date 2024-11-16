import { IReview } from "@/types/review.type";
import { Button, Form, Input, Modal, Rate } from "antd";

type Props = {
  feedback: IReview;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const FeedbackEditModal = ({ feedback, open, setOpen }: Props) => {
  const [form] = Form.useForm();

  const handleSaveChanges = (values: { feedback: string; rating: number }) => {
    console.log(values);
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
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FeedbackEditModal;
