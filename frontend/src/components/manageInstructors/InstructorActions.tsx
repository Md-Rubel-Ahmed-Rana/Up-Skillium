import { IInstructor } from "@/types/instructor.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import { FiMoreVertical } from "react-icons/fi";
import AssignCourse from "./AssignCourse";

type Props = {
  instructor: IInstructor;
};

const InstructorActions = ({ instructor }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="primary" className="bg-blue-500 hover:bg-blue-600 w-full">
          View Profile
        </Button>
      ),
    },
    {
      key: "2",
      label: <AssignCourse instructor={instructor} />,
    },
    {
      key: "3",
      label: (
        <Button
          type="dashed"
          danger
          className="text-red-500 hover:text-red-700 w-full"
        >
          Activate
        </Button>
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
      <div className="flex items-center justify-center p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        <FiMoreVertical size={20} className="text-gray-600" />
      </div>
    </Dropdown>
  );
};

export default InstructorActions;
