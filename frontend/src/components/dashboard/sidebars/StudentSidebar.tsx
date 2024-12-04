import LogoutButton from "@/components/shared/LogoutButton";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FaTachometerAlt,
  FaUserCircle,
  FaBook,
  FaVideo,
  FaChartLine,
  FaCommentDots,
  FaCertificate,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const StudentSidebar = () => {
  const router = useRouter();

  const pathToKeyMap: { [key: string]: string } = {
    "/dashboard": "0",
    "/dashboard/profile": "1",
    "/dashboard/my-courses": "2",
    "/dashboard/live-classes": "3",
    "/dashboard/enrollments": "4",
    "/dashboard/order-history": "5",
    "/dashboard/progress": "6",
    "/dashboard/discussions": "7",
    "/dashboard/certificates": "8",
  };

  const selectedKey = pathToKeyMap[router.pathname] || "1";

  const defaultItems: MenuProps["items"] = [
    {
      key: "0",
      icon: <FaTachometerAlt />,
      label: <Link href={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "1",
      icon: <FaUserCircle />,
      label: <Link href={"/dashboard/profile"}>Profile</Link>,
    },
    {
      key: "2",
      icon: <FaBook />,
      label: <Link href={"/dashboard/my-courses"}>My Courses</Link>,
    },
    {
      key: "3",
      icon: <FaVideo />,
      label: <Link href={"/dashboard/live-classes"}>Live Classes</Link>,
    },
    {
      key: "4",
      icon: <FaCertificate />,
      label: <Link href={"/dashboard/enrollments"}>Enrollments</Link>,
    },
    {
      key: "5",
      icon: <FaShoppingCart />,
      label: <Link href={"/dashboard/order-history"}>Order History</Link>,
    },
    {
      key: "6",
      icon: <FaChartLine />,
      label: <Link href={"/dashboard/progress"}>Progress</Link>,
    },
    {
      key: "7",
      icon: <FaCommentDots />,
      label: <Link href={"/dashboard/discussions"}>Discussions</Link>,
    },
    {
      key: "8",
      icon: <FaClipboardList />,
      label: <Link href={"/dashboard/certificates"}>Certificates</Link>,
    },
    {
      key: "9",
      icon: <FaSignOutAlt />,
      label: <LogoutButton />,
    },
  ];

  return (
    <Menu
      theme="light"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      selectedKeys={[selectedKey]}
      items={defaultItems}
    />
  );
};

export default StudentSidebar;
