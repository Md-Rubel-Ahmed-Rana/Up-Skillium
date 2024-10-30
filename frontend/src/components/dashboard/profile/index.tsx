import UpdateProfilePicture from "./UpdateProfilePicture";
import { useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import { FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <DashboardLayout sidebarItems={sidebarItems}>
      {/* <Button onClick={() => setIsModalOpen(true)} type="primary">
        Change Profile Picture
      </Button> */}
      <ProfileInfo />
      <UpdateProfilePicture isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </DashboardLayout>
  );
};

export default Profile;
