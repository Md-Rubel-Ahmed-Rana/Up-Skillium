import { IUser } from "@/types/user.type";
import makeOrganizePermission from "@/utils/makeOrganizePermission";
import { Descriptions } from "antd/lib";
import React from "react";

type Props = {
  user: IUser;
};

const UserPermissions = ({ user }: Props) => {
  return (
    <Descriptions
      title={`Permissions as ${user.role.role.toUpperCase()}`}
      column={{ xs: 1 }}
      bordered
      className="mt-4"
    >
      <Descriptions.Item label="Permissions">
        <ul className="list-disc list-inside">
          {user?.role?.permissions?.map((permission, index) => (
            <li key={index}>{makeOrganizePermission(permission)}</li>
          ))}
        </ul>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserPermissions;
