import LogoutButton from "@/components/shared/LogoutButton";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import React from "react";
import {
  FaUserCircle,
  FaBook,
  FaVideo,
  FaCertificate,
  FaCog,
  FaChartLine,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";

const StudentSidebar = () => {
  const defaultItems: MenuProps["items"] = [
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
      label: <Link href={"/dashboard/live-lasses"}>Live Classes</Link>,
    },
    {
      key: "4",
      icon: <FaCertificate />,
      label: <Link href={"/dashboard/certificates"}>Certificates</Link>,
    },
    {
      key: "5",
      icon: <FaChartLine />,
      label: <Link href={"/dashboard/progress"}>Progress</Link>,
    },
    {
      key: "6",
      icon: <FaCommentDots />,
      label: <Link href={"/dashboard/discussions"}>Discussions</Link>,
    },
    {
      key: "7",
      icon: <FaCog />,
      label: <Link href={"/dashboard/settings"}>Settings</Link>,
    },
    {
      key: "8",
      icon: <FaSignOutAlt />,
      label: <LogoutButton />,
    },
  ];

  return (
    <Menu
      theme="light"
      className="w-full min-h-screen h-full   mt-3"
      defaultSelectedKeys={["1"]}
      items={defaultItems}
    />
  );
};

export default StudentSidebar;
