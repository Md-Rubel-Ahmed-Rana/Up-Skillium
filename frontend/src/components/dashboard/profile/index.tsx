import DashboardLayout from "@/layout/DashboardLayout";
import { FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const sidebarItems = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: "2",
      icon: <CiSettings />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
  ];

  return (
    <>
      <div className="hidden lg:block">
        <DashboardLayout sidebarItems={sidebarItems}>
          <ProfileInfo />
        </DashboardLayout>
      </div>
      <div className="block lg:hidden">
        <ProfileInfo />
      </div>
    </>
  );
};

export default Profile;
