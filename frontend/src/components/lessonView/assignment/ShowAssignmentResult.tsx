import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { Button, Card, Result, Typography } from "antd/lib";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import ShowAssignmentSubmissionModal from "./ShowAssignmentSubmissionModal";

type Props = {
  assignment: IAssignmentSubmission;
};

const { Title } = Typography;

const ShowAssignmentResult = ({ assignment }: Props) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <Card
      className="w-full border border-gray-200 rounded-lg"
      title={<Title level={4}>Assignment Result</Title>}
    >
      <Result
        icon={
          <div className="flex justify-center">
            {assignment?.status === "checked" ? (
              <AiOutlineCheckCircle className="text-green-500 text-8xl" />
            ) : (
              <AiOutlineClockCircle className="text-yellow-500 text-8xl" />
            )}
          </div>
        }
        status={assignment?.status === "checked" ? "success" : "warning"}
        title={
          assignment?.status === "pending"
            ? "Assignment is being reviewed"
            : `Score: ${assignment?.yourMark ?? "-"} / ${
                assignment?.fullMark ?? "-"
              }`
        }
        className="mb-4"
      />

      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          onClick={() => setShowSubmission(true)}
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
        >
          View Submission
        </Button>
        {assignment?.status === "checked" && (
          <Button
            onClick={() => setShowFeedback((prev) => !prev)}
            type="default"
            className="bg-gray-100 hover:bg-gray-200"
          >
            {`${showFeedback ? "Hide" : "View"} Feedback`}
          </Button>
        )}
      </div>
      {showFeedback && (
        <div
          className="mt-5 shadow-md p-2"
          dangerouslySetInnerHTML={{ __html: assignment?.feedback }}
        />
      )}
      <ShowAssignmentSubmissionModal
        open={showSubmission}
        setOpen={setShowSubmission}
        submission={assignment?.submission}
      />
    </Card>
  );
};

export default ShowAssignmentResult;
