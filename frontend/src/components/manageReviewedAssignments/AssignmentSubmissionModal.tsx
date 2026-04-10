import { Button, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  submission: {
    content: string;
    file: string;
  };
  buttonSize?: "small" | "large" | "middle";
  buttonType?: "default" | "primary";
  buttonStyles?: string;
};

const AssignmentSubmissionModal = ({
  submission,
  buttonSize = "small",
  buttonType = "default",
  buttonStyles = "w-full",
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={`w-full ${buttonStyles}`}
        size={buttonSize}
        type={buttonType}
      >
        Submission
      </Button>
      <Modal
        title="Assignment submission"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      >
        {submission?.content ? (
          <div dangerouslySetInnerHTML={{ __html: submission?.content }} />
        ) : (
          <p className="text-gray-700">No submission provided.</p>
        )}
      </Modal>
    </>
  );
};

export default AssignmentSubmissionModal;
