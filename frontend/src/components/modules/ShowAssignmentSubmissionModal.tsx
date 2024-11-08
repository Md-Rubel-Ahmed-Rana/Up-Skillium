import { ISubmission } from "@/types/assignmentSubmission.type";
import { Modal, Typography } from "antd/lib";

const { Text, Paragraph } = Typography;

type Props = {
  submission: ISubmission;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ShowAssignmentSubmissionModal = ({
  submission,
  open,
  setOpen,
}: Props) => {
  return (
    <div>
      <Modal
        title="Assignment Submission"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width="90vw"
        styles={{ body: { height: "80vh", overflowY: "auto" } }}
        style={{ top: 0 }}
        footer={null}
      >
        <div className="bg-gray-100 p-6 rounded-md h-full">
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: submission.content }} />
          </Paragraph>
          {submission.file && (
            <Text>
              <a
                href={submission.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Submitted File
              </a>
            </Text>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ShowAssignmentSubmissionModal;
