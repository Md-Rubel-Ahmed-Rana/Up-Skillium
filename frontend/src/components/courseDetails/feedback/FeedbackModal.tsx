import { Button, Input, Modal, Rate } from "antd";
import { useState } from "react";
import FeedbackButton from "./FeedbackButton";

const { TextArea } = Input;

const FeedbackModal = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide a rating and feedback.");
      return;
    }

    setRating(0);
    setFeedback("");
  };

  return (
    <>
      <div className="flex items-center gap-3 my-4">
        <FeedbackButton
          setOpen={setIsOpen}
          setTitle={setTitle}
          buttonType="primary"
          feedbackType="Course"
        />
        <FeedbackButton
          setOpen={setIsOpen}
          setTitle={setTitle}
          buttonType="default"
          feedbackType="Instructor"
        />
      </div>
      <Modal
        title={`Feedback to ${title}`}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
      >
        <div className="flex flex-col gap-4 my-5">
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
            disabled={rating === 0 || feedback.trim() === ""}
          >
            Submit Feedback
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackModal;
