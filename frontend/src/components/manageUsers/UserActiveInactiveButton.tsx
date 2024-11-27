import { Button } from "antd/lib";

type User = {
  id: string;
  status: "active" | "inactive";
};

type Props = {
  user: User;
  buttonStyles?: string;
  buttonType: "dashed" | "default" | "primary";
};

const UserActiveInactiveButton = ({
  user: { id, status },
  buttonType = "default",
  buttonStyles,
}: Props) => {
  return (
    <>
      <Button className={buttonStyles} type={buttonType}>
        {status === "active" ? "Inactive" : "Active"}
      </Button>
    </>
  );
};

export default UserActiveInactiveButton;
