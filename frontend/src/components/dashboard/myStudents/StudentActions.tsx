import { IMyStudent } from "@/types/student.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import { FiMoreVertical } from "react-icons/fi";

type Props = {
  student: IMyStudent;
};

const StudentActions = ({}: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="primary" className="bg-blue-500 hover:bg-blue-600 w-full">
          View
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="default"
          className="bg-green-500 text-white hover:bg-green-600 w-full"
        >
          Edit
        </Button>
      ),
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
    {
      key: "4",
      label: (
        <Button className="w-full" danger>
          Delete
        </Button>
      ),
    },
    {
      key: "5",
      label: (
        <Button
          type="default"
          className="bg-purple-500 text-white hover:bg-purple-600 w-full"
        >
          Assign Courses
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

export default StudentActions;
