import { IStudent } from "@/types/student.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import { FiMoreVertical } from "react-icons/fi";
import UserActiveInactiveButton from "../manageUsers/UserActiveInactiveButton";
import PublicProfileRedirectLink from "../publicProfile/PublicProfileRedirectLink";

type Props = {
  student: IStudent;
};

const StudentActions = ({ student }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <PublicProfileRedirectLink
          buttonType="primary"
          isButton={true}
          linkText="View Profile"
          user={student?.user}
          buttonStyles="w-full"
          linkStyles="w-full"
        />
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="default"
          className="bg-green-500 text-white hover:bg-green-600 w-full"
        >
          View Progress
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <UserActiveInactiveButton
          buttonType="default"
          buttonStyles="w-full"
          user={{
            id: student?.user?.id || student?.user?._id,
            status: student?.user?.status as "active" | "inactive",
            userName: student?.user?.name,
          }}
        />
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
