import { Menu, MenuProps } from "antd/lib";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaChartBar,
  FaCogs,
  FaCertificate,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <FaChalkboardTeacher />,
      label: "Manage Instructors",
    },
    {
      key: "3",
      icon: <FaUsers />,
      label: "Manage Students",
    },
    {
      key: "4",
      icon: <FaBook />,
      label: "Manage Courses",
    },
    {
      key: "5",
      icon: <FaCertificate />,
      label: "Certificates",
    },
    {
      key: "6",
      icon: <FaChartBar />,
      label: "Reports",
    },
    {
      key: "7",
      icon: <FaComments />,
      label: "Feedback & Reviews",
    },
    {
      key: "8",
      icon: <FaCogs />,
      label: "Settings",
    },
    {
      key: "9",
      icon: <FaSignOutAlt />,
      label: "Logout",
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={adminItems}
    />
  );
};

export default AdminSidebar;
