import LogoutButton from "@/components/shared/LogoutButton";
import buildPathToKeyMap from "@/utils/buildPathToKeyMapSidebar";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBook,
  FaClipboardList,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserCircle,
  FaVideo,
} from "react-icons/fa";

export const studentSidebarItems: MenuProps["items"] = [
  {
    key: "1",
    icon: <FaUserCircle />,
    label: <Link href={"/dashboard/profile-info"}>Profile</Link>,
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
    icon: <FaShoppingCart />,
    label: <Link href={"/dashboard/order-history"}>Order History</Link>,
  },
  {
    key: "5",
    icon: <FaClipboardList />,
    label: <Link href={"/dashboard/certificates"}>Certificates</Link>,
  },
  {
    key: "6",
    icon: <FaSignOutAlt />,
    label: <LogoutButton />,
  },
];

const StudentSidebar = () => {
  const router = useRouter();

  const pathToKeyMap = buildPathToKeyMap(studentSidebarItems);
  const selectedKey = pathToKeyMap[router.pathname] || "1";

  return (
    <Menu
      theme="light"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      selectedKeys={[selectedKey]}
      items={studentSidebarItems}
    />
  );
};

export default StudentSidebar;
