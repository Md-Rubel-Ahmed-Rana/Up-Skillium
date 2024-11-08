import { ISubmission } from "@/types/assignmentSubmission.type";
import { Typography } from "antd/lib";

const { Text, Paragraph } = Typography;

type Props = {
  submission: ISubmission;
};

const ShowAssignmentSubmissionModal = ({ submission }: Props) => {
  return (
    <div>
      <Paragraph className="bg-gray-100 p-4 rounded">
        <div dangerouslySetInnerHTML={{ __html: submission.content }} />
      </Paragraph>
      {submission.file && (
        <Text>
          <a href={submission.file} target="_blank" rel="noopener noreferrer">
            View Submitted File
          </a>
        </Text>
      )}
    </div>
  );
};

export default ShowAssignmentSubmissionModal;
