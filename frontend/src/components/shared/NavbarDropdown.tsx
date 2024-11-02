/* eslint-disable @next/next/no-img-element */
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd/lib";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type Props = {
  dashboardRoute: string;
};

const NavbarDropdown = ({ dashboardRoute }: Props) => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: "2",
      label: <Link href={dashboardRoute}>Dashboard</Link>,
    },
    {
      key: "3",
      label: <Link href="/my-courses">My Courses</Link>,
    },
    {
      key: "4",
      label: <LogoutButton />,
    },
  ];

  return (
    <Dropdown
      className="cursor-pointer"
      menu={{ items }}
      placement="bottomRight"
      arrow
    >
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
    </Dropdown>
  );
};

export default NavbarDropdown;
