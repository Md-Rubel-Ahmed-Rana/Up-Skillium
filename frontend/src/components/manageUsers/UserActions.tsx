import { IUser } from "@/types/user.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import PublicProfileRedirectLink from "../publicProfile/PublicProfileRedirectLink";
import RedirectPasswordChange from "./RedirectPasswordChange";
import UserActiveInactiveButton from "./UserActiveInactiveButton";
import UserDeleteButton from "./UserDeleteButton";

type Props = {
  user: IUser;
};

const UserActions = ({ user }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "User Actions",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <PublicProfileRedirectLink
          buttonType="primary"
          isButton={true}
          linkText="Profile"
          user={user}
          buttonStyles="w-full"
          linkStyles="w-full"
        />
      ),
    },
    {
      key: "3",
      label: (
        <UserActiveInactiveButton
          buttonType="default"
          user={{
            id: user?.id || user?._id,
            status: user?.status as "active" | "inactive",
            userName: user?.name,
          }}
          buttonStyles="w-full bg-yellow-500"
        />
      ),
    },
    {
      key: "4",
      label: (
        <UserDeleteButton
          buttonType="primary"
          user={{
            id: user?.id || user?._id,
            userName: user?.name,
          }}
          buttonStyles="w-full"
        />
      ),
    },
    {
      key: "5",
      label: <RedirectPasswordChange user={user} />,
    },
  ];
  return (
    <div className="flex items-center gap-2">
      <Dropdown menu={{ items }}>
        <Button className="w-full" type="primary">
          Show
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserActions;
