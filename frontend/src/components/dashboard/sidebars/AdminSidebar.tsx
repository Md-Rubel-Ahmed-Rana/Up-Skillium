import LogoutButton from "@/components/shared/LogoutButton";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaChartBar,
  FaCertificate,
  FaComments,
  FaSignOutAlt,
  FaPlusCircle,
  FaVideo,
  FaCog,
  FaChartLine,
} from "react-icons/fa";

const AdminSidebar = () => {
  const router = useRouter();

  const pathToKeyMap: { [key: string]: string } = {
    "/dashboard/profile": "1",
    "/dashboard/manage-instructors": "2",
    "/dashboard/manage-students": "3",
    "/dashboard/manage-courses": "4",
    "/dashboard/manage-certificates": "5",
    "/dashboard/reports": "6",
    "/dashboard/feedback-reviews": "7",
    "/dashboard/create-course": "8",
    "/dashboard/create-module": "9",
    "/dashboard/create-lesson": "10",
    "/dashboard/add-instructor": "11",
    "/dashboard/create-certificate": "12",
    "/dashboard/meetings": "13",
    "/dashboard/settings": "14",
    "/dashboard/analytics": "15",
  };

  const selectedKey = pathToKeyMap[router.pathname] || "1";

  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: <Link href={"/dashboard/profile"}>Profile</Link>,
    },
    {
      key: "2",
      icon: <FaChalkboardTeacher />,
      label: (
        <Link href={"/dashboard/manage-instructors"}>Manage Instructors</Link>
      ),
    },
    {
      key: "3",
      icon: <FaUsers />,
      label: <Link href={"/dashboard/manage-students"}>Manage Students</Link>,
    },
    {
      key: "4",
      icon: <FaBook />,
      label: <Link href={"/dashboard/manage-courses"}>Manage Courses</Link>,
    },
    {
      key: "5",
      icon: <FaCertificate />,
      label: <Link href={"/dashboard/manage-certificates"}>Certificates</Link>,
    },
    {
      key: "6",
      icon: <FaChartBar />,
      label: <Link href={"/dashboard/reports"}>Reports</Link>,
    },
    {
      key: "7",
      icon: <FaComments />,
      label: (
        <Link href={"/dashboard/feedback-reviews"}>Feedback & Reviews</Link>
      ),
    },
    {
      key: "8",
      icon: <FaPlusCircle />,
      label: <Link href={"/dashboard/create-course"}>Create Course</Link>,
    },
    {
      key: "9",
      icon: <FaPlusCircle />,
      label: <Link href={"/dashboard/create-module"}>Create Module</Link>,
    },
    {
      key: "10",
      icon: <FaPlusCircle />,
      label: <Link href={"/dashboard/create-lesson"}>Create Lesson</Link>,
    },
    {
      key: "11",
      icon: <FaChalkboardTeacher />,
      label: <Link href={"/dashboard/add-instructor"}>Add Instructor</Link>,
    },
    {
      key: "12",
      icon: <FaCertificate />,
      label: (
        <Link href={"/dashboard/create-certificate"}>Create Certificate</Link>
      ),
    },
    {
      key: "13",
      icon: <FaVideo />,
      label: <Link href={"/dashboard/meetings"}>Manage Meetings</Link>,
    },
    {
      key: "14",
      icon: <FaCog />,
      label: <Link href={"/dashboard/settings"}>Settings</Link>,
    },
    {
      key: "15",
      icon: <FaChartLine />,
      label: <Link href={"/dashboard/analytics"}>Analytics</Link>,
    },
    {
      key: "16",
      icon: <FaSignOutAlt />,
      label: <LogoutButton />,
    },
  ];

  return (
    <Menu
      theme="light"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      defaultSelectedKeys={[selectedKey]}
      items={adminItems}
    />
  );
};

export default AdminSidebar;
