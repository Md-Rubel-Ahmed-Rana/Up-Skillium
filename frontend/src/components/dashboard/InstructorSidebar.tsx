import { Menu, MenuProps } from "antd/lib";
import {
  FaUserCircle,
  FaBookOpen,
  FaUserGraduate,
  FaTasks,
  FaClipboardCheck,
  FaChartLine,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";

const InstructorSidebar = () => {
  const InstructorItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <FaBookOpen />,
      label: "My Courses",
    },
    {
      key: "3",
      icon: <FaUserGraduate />,
      label: "Students",
    },
    {
      key: "4",
      icon: <FaTasks />,
      label: "Assignments",
    },
    {
      key: "5",
      icon: <FaClipboardCheck />,
      label: "Grading",
    },
    {
      key: "6",
      icon: <FaChartLine />,
      label: "Performance",
    },
    {
      key: "7",
      icon: <FaCommentDots />,
      label: "Feedback",
    },
    {
      key: "8",
      icon: <FaSignOutAlt />,
      label: "Logout",
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={InstructorItems}
    />
  );
};

export default InstructorSidebar;
