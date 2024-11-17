import { IUser } from "@/types/user.type";
import makeOrganizePermission from "@/utils/makeOrganizePermission";
import { Descriptions } from "antd/lib";
import { useMediaQuery } from "react-responsive";

type Props = {
  user: IUser;
};

const UserPermissions = ({ user }: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  return (
    <Descriptions
      title={`Permissions as ${user?.role?.name?.toUpperCase()}`}
      bordered={isLargeDevice}
      className="mt-4"
    >
      <Descriptions.Item label={isLargeDevice ? "Permissions" : ""}>
        <ul className="list-disc list-inside border lg:border-0 p-3 rounded-md w-full">
          {user?.role?.permissions?.map((permission, index) => (
            <li key={index}>{makeOrganizePermission(permission)}</li>
          ))}
        </ul>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserPermissions;
