import LogoutButton from "@/components/shared/LogoutButton";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import {
  FaUserCircle,
  FaBookOpen,
  FaUserGraduate,
  FaTasks,
  FaChartLine,
  FaCommentDots,
  FaSignOutAlt,
  FaCalendarAlt,
  FaChartPie,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaListAlt,
  FaQuestionCircle,
  FaFolderPlus,
} from "react-icons/fa";

const InstructorSidebar = () => {
  const InstructorItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: (
        <Link href={"/dashboard/profile"}>Profile</Link>
      ),
    },
    {
      key: "2",
      icon: <FaBookOpen />,
      label: (
        <Link href={"/dashboard/my-classes"}>My Classes</Link>
      ),
    },
    {
      key: "3",
      icon: <FaUserGraduate />,
      label: (
        <Link href={"/dashboard/my-students"}>My Students</Link>
      ),
    },
    {
      key: "4",
      icon: <FaTasks />,
      label: (
        <Link href={"/dashboard/assignments"}>Assignments</Link>
      ),
    },
    {
      key: "5",
      icon: <FaLayerGroup />,
      label: (
        <Link href={"/dashboard/create-module"}>Create Module</Link>
      ),
    },
    {
      key: "6",
      icon: <FaListAlt />,
      label: (
        <Link href={"/dashboard/create-lesson"}>Create Lesson</Link>
      ),
    },
    {
      key: "7",
      icon: <FaQuestionCircle />,
      label: (
        <Link href={"/dashboard/create-quiz"}>Create Quiz</Link>
      ),
    },
    {
      key: "8",
      icon: <FaFolderPlus />,
      label: "Manage Content",
      children: [
        {
          key: "8-1",
          icon: <FaLayerGroup />,
          label: <Link href={"/dashboard/manage-modules"}>Modules</Link>,
        },
        {
          key: "8-2",
          icon: <FaListAlt />,
          label: <Link href={"/dashboard/manage-lessons"}>Lessons</Link>,
        },
        {
          key: "8-3",
          icon: <FaQuestionCircle />,
          label: <Link href={"/dashboard/manage-quizzes"}>Quizzes</Link>,
        },
      ],
    },
    {
      key: "9",
      icon: <FaChartLine />,
      label: <Link href={"/dashboard/performance"}>Performance</Link>,
    },
    {
      key: "10",
      icon: <FaCalendarAlt />,
      label: <Link href={"/dashboard/meetings"}>Meetings</Link>,
    },
    {
      key: "11",
      icon: <FaChartPie />,
      label: <Link href={"/dashboard/analytics"}>Analytic</Link>,
    },
    {
      key: "12",
      icon: <FaChalkboardTeacher />,
      label: <Link href={"/dashboard/teaching-resources"}>Teaching Resources</Link>,
    },
    {
      key: "13",
      icon: <FaCommentDots />,
      label: <Link href={"/dashboard/feedback"}>Feedback</Link>,
    },
    {
      key: "14",
      icon: <FaSignOutAlt />,
      label: <LogoutButton />,
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
