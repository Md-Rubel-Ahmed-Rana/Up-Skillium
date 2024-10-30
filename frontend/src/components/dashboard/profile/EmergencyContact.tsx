import { IUser } from "@/types/user.type";
import { Descriptions } from "antd/lib";
import React from "react";

type Props = {
  user: IUser;
};

const EmergencyContact = ({ user }: Props) => {
  return (
    <Descriptions
      title="Emergency Contact"
      column={{ xs: 1, sm: 1, md: 2 }}
      bordered
      className="mt-4"
    >
      <Descriptions.Item label="Name">
        {user?.emergencyContact?.name || "Empty"}
      </Descriptions.Item>
      <Descriptions.Item label="Relationship">
        {user?.emergencyContact?.relationship || "Empty"}
      </Descriptions.Item>
      <Descriptions.Item label="Phone">
        {user?.emergencyContact?.phone || "Empty"}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default EmergencyContact;
