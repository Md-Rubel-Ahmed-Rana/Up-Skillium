import LogoutButton from "@/components/shared/LogoutButton";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBook,
  FaCertificate,
  FaChalkboardTeacher,
  FaChartBar,
  FaChartLine,
  FaComments,
  FaSignOutAlt,
  FaUserCircle,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

import { GiTeacher } from "react-icons/gi";
import { MdOutlineContentPaste } from "react-icons/md";
import { PiChalkboardTeacherLight } from "react-icons/pi";

const AdminSidebar = () => {
  const router = useRouter();

  const pathToKeyMap: { [key: string]: string } = {
    "/dashboard/profile": "1",
    "/dashboard/manage-instructors": "2-1",
    "/dashboard/create-instructor": "2-2",
    "/dashboard/manage-students": "3",
    "/dashboard/manage-courses": "4-1",
    "/dashboard/create-course": "4-2",
    "/dashboard/manage-modules": "5-1",
    "/dashboard/create-module": "5-2",
    "/dashboard/manage-lessons": "6-1",
    "/dashboard/create-lesson": "6-2",
    "/dashboard/manage-quizzes": "7-1",
    "/dashboard/create-quiz": "7-2",
    "/dashboard/manage-certificates": "8-1",
    "/dashboard/create-certificate": "8-2",
    "/dashboard/reports": "9",
    "/dashboard/manage-assignments": "10-1",
    "/dashboard/create-assignment": "10-2",
    "/dashboard/feedback-reviews": "11",
    "/dashboard/meetings": "12",
    "/dashboard/analytics": "13",
  };

  const selectedKey = pathToKeyMap[router.pathname] || "1";

  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: "2",
      icon: <GiTeacher />,
      label: "Manage Instructors",
      children: [
        {
          key: "2-1",
          icon: <FaChalkboardTeacher />,
          label: (
            <Link href="/dashboard/manage-instructors">All Instructors</Link>
          ),
        },
        {
          key: "2-2",
          icon: <PiChalkboardTeacherLight />,
          label: (
            <Link href="/dashboard/create-instructor">Create Instructor</Link>
          ),
        },
      ],
    },
    {
      key: "3",
      icon: <FaUsers />,
      label: <Link href="/dashboard/manage-students">Manage Students</Link>,
    },
    {
      key: "4",
      icon: <FaBook />,
      label: "Manage Courses",
      children: [
        {
          key: "4-1",
          icon: <FaChalkboardTeacher />,
          label: <Link href="/dashboard/manage-courses">All Courses</Link>,
        },
        {
          key: "4-2",
          icon: <PiChalkboardTeacherLight />,
          label: <Link href="/dashboard/create-course">Create Course</Link>,
        },
      ],
    },
    {
      key: "5",
      icon: <MdOutlineContentPaste />,
      label: "Manage Content",
      children: [
        {
          key: "5-1",
          icon: <FaChalkboardTeacher />,
          label: <Link href="/dashboard/manage-modules">All Modules</Link>,
        },
        {
          key: "5-2",
          icon: <PiChalkboardTeacherLight />,
          label: <Link href="/dashboard/create-module">Create Module</Link>,
        },
        {
          key: "6-1",
          icon: <FaChalkboardTeacher />,
          label: <Link href="/dashboard/manage-lessons">All Lessons</Link>,
        },
        {
          key: "6-2",
          icon: <PiChalkboardTeacherLight />,
          label: <Link href="/dashboard/create-lesson">Create Lesson</Link>,
        },
        {
          key: "7-1",
          icon: <FaChalkboardTeacher />,
          label: <Link href="/dashboard/manage-quizzes">All Quizzes</Link>,
        },
        {
          key: "7-2",
          icon: <PiChalkboardTeacherLight />,
          label: <Link href="/dashboard/create-quiz">Create Quiz</Link>,
        },
      ],
    },
    {
      key: "8",
      icon: <FaCertificate />,
      label: "Manage Certificates",
      children: [
        {
          key: "8-1",
          icon: <FaChalkboardTeacher />,
          label: (
            <Link href="/dashboard/manage-certificates">All Certificates</Link>
          ),
        },
        {
          key: "8-2",
          icon: <PiChalkboardTeacherLight />,
          label: (
            <Link href="/dashboard/create-certificate">Create Certificate</Link>
          ),
        },
      ],
    },
    {
      key: "9",
      icon: <FaChartBar />,
      label: <Link href="/dashboard/reports">Reports</Link>,
    },
    {
      key: "10",
      icon: <FaChartBar />,
      label: "Assignments",
      children: [
        {
          key: "10-1",
          icon: <FaChalkboardTeacher />,
          label: (
            <Link href="/dashboard/manage-assignments">All Assignments</Link>
          ),
        },
        {
          key: "10-2",
          icon: <PiChalkboardTeacherLight />,
          label: (
            <Link href="/dashboard/create-assignment">Create Assignment</Link>
          ),
        },
      ],
    },
    {
      key: "11",
      icon: <FaComments />,
      label: <Link href="/dashboard/feedback-reviews">Feedback & Reviews</Link>,
    },
    {
      key: "12",
      icon: <FaVideo />,
      label: <Link href="/dashboard/meetings">Manage Meetings</Link>,
    },
    {
      key: "13",
      icon: <FaChartLine />,
      label: <Link href="/dashboard/analytics">Analytics</Link>,
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
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      defaultSelectedKeys={[selectedKey]}
      items={adminItems}
    />
  );
};

export default AdminSidebar;
