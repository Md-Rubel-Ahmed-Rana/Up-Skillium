import { IUser } from "@/types/user.type";
import { Descriptions } from "antd/lib";
import React from "react";
import { FaEdit } from "react-icons/fa";

type Props = {
  user: IUser;
};

const UserAddress = ({ user }: Props) => {
  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span>Address</span>
          <FaEdit className="cursor-pointer" />
        </div>
      }
      column={2}
      bordered
      className="mt-4 pb-4 border-b"
    >
      <Descriptions.Item label="Street" span={1}>
        {user?.address?.street || "Empty"}
      </Descriptions.Item>
      <Descriptions.Item label="City" span={1}>
        {user?.address?.city || "Empty"}
      </Descriptions.Item>
      <Descriptions.Item label="State" span={1}>
        {user?.address?.state || "Empty"}
      </Descriptions.Item>
      <Descriptions.Item label="Country" span={1}>
        {user?.address?.country || "Empty"}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserAddress;
