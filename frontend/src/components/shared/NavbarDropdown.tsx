import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { Avatar, Dropdown, MenuProps } from "antd/lib";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoutButton from "./LogoutButton";

type Props = {
  isToggleIcon: boolean;
};

const NavbarDropdown = ({ isToggleIcon }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/dashboard/profile-info">Profile</Link>,
    },
    {
      key: "2",
      label: <Link href={"/courses"}>Courses</Link>,
    },
    {
      key: "3",
      label: <LogoutButton />,
    },
  ];

  return (
    <Dropdown
      className="cursor-pointer"
      menu={{ items }}
      placement="bottomRight"
      arrow
      onOpenChange={(open) => setIsOpen(open)}
    >
      {isToggleIcon ? (
        <div> {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</div>
      ) : (
        <div>
          {user && user?.image ? (
            <img
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              src={user?.image}
              alt="Profile"
              className="border-2 border-blue-600"
            />
          ) : (
            <Avatar className="ring-2 bg-green-600">
              {user?.name?.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
        </div>
      )}
    </Dropdown>
  );
};

export default NavbarDropdown;
