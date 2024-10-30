import { IUser } from "@/types/user.type";
import { Descriptions } from "antd/lib";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";

type Props = {
  user: IUser;
};

const BasicInformation = ({ user }: Props) => {
  return (
    <Descriptions
      title="Basic Information"
      column={2}
      bordered
      className="mt-4"
    >
      <Descriptions.Item label="Email" span={1}>
        <div className="flex items-center gap-2">
          <CiMail />
          {user?.email}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Phone" span={1}>
        <div className="flex items-center gap-2">
          <FaPhone />
          {user?.phoneNumber}
        </div>
      </Descriptions.Item>

      <Descriptions.Item label="Date of Birth" span={1}>
        {user?.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleDateString()
          : "Empty"}
      </Descriptions.Item>
      <Descriptions.Item label="Gender" span={1}>
        {user?.gender ? user.gender : "Empty"}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BasicInformation;
