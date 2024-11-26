import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  user: IUser;
  linkText?: "Profile" | "View Profile";
  isButton: boolean;
  buttonType: "dashed" | "default" | "primary";
};

const PublicProfileRedirectLink = ({
  user,
  linkText = "View Profile",
  isButton,
  buttonType = "default",
}: Props) => {
  return (
    <>
      {isButton ? (
        <Link
          href={`/profile/${user?.id || user?._id}?name=${user?.name}&email=${
            user?.email
          }`}
        >
          <Button type={buttonType}>{linkText}</Button>
        </Link>
      ) : (
        <Link
          href={`/profile/${user?.id}?name=${user?.name}&email=${user?.email}`}
        >
          {linkText}
        </Link>
      )}
    </>
  );
};

export default PublicProfileRedirectLink;
