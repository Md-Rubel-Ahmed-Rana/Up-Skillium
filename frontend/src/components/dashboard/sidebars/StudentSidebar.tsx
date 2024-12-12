import LogoutButton from "@/components/shared/LogoutButton";
import buildPathToKeyMap from "@/utils/buildPathToKeyMapSidebar";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBook,
  FaChartLine,
  FaClipboardList,
  FaCommentDots,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle,
  FaVideo,
} from "react-icons/fa";

const StudentSidebar = () => {
  const router = useRouter();
  const studentItems: MenuProps["items"] = [
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

  const pathToKeyMap = buildPathToKeyMap(studentItems);
  const selectedKey = pathToKeyMap[router.pathname] || "1";

  return (
    <Menu
      theme="light"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      selectedKeys={[selectedKey]}
      items={studentItems}
    />
  );
};

export default StudentSidebar;
