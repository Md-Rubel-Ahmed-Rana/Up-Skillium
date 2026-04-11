import { IUser } from "@/types/user.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import PublicProfileRedirectLink from "../publicProfile/PublicProfileRedirectLink";
import RedirectPasswordChange from "./RedirectPasswordChange";
import UserActiveInactiveButton from "./UserActiveInactiveButton";
import UserDeleteButton from "./UserDeleteButton";
import { MoreOutlined } from "@ant-design/icons";
import ChangeProfilePicture from "./ChangeProfilePicture";
import { useState } from "react";

type Props = {
  user: IUser;
};

const UserActions = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
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
      key: "2",
      label: (
        <Button onClick={() => setOpen(true)}>Change Profile Picture</Button>
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
    <>
      <div className="flex items-end justify-center gap-2">
        <Dropdown menu={{ items }}>
          <MoreOutlined className="border px-3 py-1 rounded-md border-blue-500 cursor-pointer" />
        </Dropdown>
      </div>
      {open && (
        <ChangeProfilePicture
          isOpen={open}
          setIsOpen={setOpen}
          userId={user?.id || user?._id}
        />
      )}
    </>
  );
};

export default UserActions;
