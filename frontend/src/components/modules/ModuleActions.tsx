import { Button, Dropdown, MenuProps } from "antd/lib";
import { PiDotsThreeCircleVertical } from "react-icons/pi";

const ModuleActions = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button className="w-full" type="primary">
          Edit
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button className="w-full" type="primary" danger>
          Delete
        </Button>
      ),
    },
    {
      key: "3",
      label: <Button className="w-full">Details</Button>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Button>
        <PiDotsThreeCircleVertical size={28} className="text-blue-600" />
      </Button>
    </Dropdown>
  );
};

export default ModuleActions;
