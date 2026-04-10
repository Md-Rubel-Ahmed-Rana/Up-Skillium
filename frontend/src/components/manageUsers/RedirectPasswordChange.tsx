import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  user: IUser;
};

const RedirectPasswordChange = ({ user }: Props) => {
  const link = `/dashboard/auth/change-password/${user?.id}?email=${user?.email}&name=${user?.name}&role=${user?.role?.name}`;
  return (
    <Link href={link}>
      <Button type="primary">Change Password</Button>
    </Link>
  );
};

export default RedirectPasswordChange;
