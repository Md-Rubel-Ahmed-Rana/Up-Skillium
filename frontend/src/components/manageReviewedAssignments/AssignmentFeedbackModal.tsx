import { Button, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  feedback: string;
};

const AssignmentFeedbackModal = ({ feedback }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-yellow-400 w-full  text-gray-700"
        type="default"
        variant="outlined"
        size="small"
        onClick={() => setIsModalOpen(true)}
      >
        Feedback
      </Button>
      <Modal
        title="Assignment Feedback"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {feedback ? (
          <div dangerouslySetInnerHTML={{ __html: feedback }} />
        ) : (
          <p className="text-gray-700">No feedback provided.</p>
        )}
      </Modal>
    </>
  );
};

export default AssignmentFeedbackModal;
