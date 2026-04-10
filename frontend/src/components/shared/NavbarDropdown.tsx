import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { Avatar, Dropdown, MenuProps } from "antd/lib";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import CourseCart from "../cart";
import LogoutButton from "./LogoutButton";

type Props = {
  isToggleIcon: boolean;
};

const NavbarDropdown = ({ isToggleIcon }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const commonItems = [
    {
      key: "courses",
      label: <Link href="/courses">Courses</Link>,
    },
    {
      key: "team",
      label: <Link href="/team">Our Team</Link>,
    },
    {
      key: "success",
      label: <Link href="/success-stories">Success Stories</Link>,
    },
  ];

  const authItems = user?.id
    ? [
        {
          key: "profile",
          label: <Link href="/dashboard/profile-info">Dashboard</Link>,
        },
        {
          key: "logout",
          label: <LogoutButton />,
        },
      ]
    : [
        {
          key: "login",
          label: <Link href="/login">Login</Link>,
        },
        {
          key: "register",
          label: <Link href="/register">Register</Link>,
        },
      ];

  const items: MenuProps["items"] = [...authItems, ...commonItems];

  return (
    <Dropdown
      className="cursor-pointer"
      menu={{ items }}
      placement="bottomRight"
      arrow
      onOpenChange={(open) => setIsOpen(open)}
    >
      {isToggleIcon && !user?.id ? (
        <div className="flex items-center gap-4">
          <CourseCart />
          <span>{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</span>
        </div>
      ) : (
        <div>
          {user && user?.image ? (
            <img
              src={user?.image}
              alt="Profile"
              className="border-2 lg:w-12 lg:h-12 w-10 h-10 rounded-full border-blue-600"
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
