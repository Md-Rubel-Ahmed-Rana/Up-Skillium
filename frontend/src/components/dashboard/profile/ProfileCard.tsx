import { IUser } from "@/types/user.type";
import { Avatar, Button } from "antd/lib";
import React from "react";

type Props = {
  user: IUser;
};

const ProfileCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Avatar size={80} src={user?.image} alt="User Avatar" />
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{user?.name}</h2>
        <p>
          <Button type="default" className="text-gray-500">
            {user?.role?.role.toUpperCase()}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
