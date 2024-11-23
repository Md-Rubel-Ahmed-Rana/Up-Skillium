import { IAssignmentSubmission } from "@/types/assignmentSubmission.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import Link from "next/link";

type Props = {
  assignment: IAssignmentSubmission;
};

const AssignmentActions = ({ assignment }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          className="bg-yellow-400 w-full text-gray-700"
          type="default"
          variant="outlined"
        >
          Feedback
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button className="w-full" type="default">
          Submission
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="w-full"
          href={`/dashboard/update-assignment/${assignment?.id}?lessonTitle=${assignment?.lesson?.title}`}
        >
          <Button className="w-full" type="primary">
            Recheck
          </Button>
        </Link>
      ),
    },
  ];
  return (
    <Dropdown
      className="cursor-pointer"
      menu={{ items }}
      placement="bottomRight"
      arrow
    >
      <Button type="primary">Show</Button>
    </Dropdown>
  );
};

export default AssignmentActions;
