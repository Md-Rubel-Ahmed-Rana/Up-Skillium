import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import AssignmentFeedbackModal from "./AssignmentFeedbackModal";
import AssignmentReviewButton from "./AssignmentReviewButton";
import AssignmentSubmissionModal from "./AssignmentSubmissionModal";

type Props = {
  assignment: IAssignmentSubmission;
};

const AssignmentActions = ({ assignment }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <AssignmentFeedbackModal feedback={assignment?.feedback || ""} />
      <AssignmentSubmissionModal submission={assignment?.submission} />
      <AssignmentReviewButton
        assignment={assignment}
        buttonText="Recheck"
        buttonType="primary"
      />
    </div>
  );
};

export default AssignmentActions;
