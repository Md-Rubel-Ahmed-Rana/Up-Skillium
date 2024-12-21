import { Menu, MenuProps } from "antd/lib";
import { FaUserCircle } from "react-icons/fa";

const DefaultSidebar = () => {
  const defaultItems: MenuProps["items"] = Array.from({ length: 10 }).map(
    (_, index) => ({
      key: index + 1,
      icon: <FaUserCircle />,
      label: `Default item ${index + 1}`,
    })
  );

  return (
    <Menu
      theme="light"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      selectedKeys={["1"]}
      items={defaultItems}
    />
  );
};

export default DefaultSidebar;
