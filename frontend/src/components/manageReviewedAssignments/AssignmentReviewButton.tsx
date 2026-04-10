import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  assignment: IAssignmentSubmission;
  buttonText: string;
  buttonSize?: "small" | "large" | "middle";
  buttonType?: "default" | "primary";
  buttonStyles?: string;
};

const AssignmentReviewButton = ({
  assignment,
  buttonText,
  buttonSize = "small",
  buttonStyles,
  buttonType,
}: Props) => {
  return (
    <Link
      className="w-full"
      href={`/dashboard/assignments/review/${assignment?.id}?lessonTitle=${assignment?.lesson?.title}&lessonId=${assignment?.lesson?.id}&studentId=${assignment?.user?.id}&studentName=${assignment?.user?.name}`}
    >
      <Button
        className={`w-full ${buttonStyles}`}
        size={buttonSize}
        type={buttonType}
      >
        {buttonText || "Review"}
      </Button>
    </Link>
  );
};

export default AssignmentReviewButton;
