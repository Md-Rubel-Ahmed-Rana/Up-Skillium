import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  user: IUser;
  linkText?: "Profile" | "View Profile";
  isButton: boolean;
  buttonStyles?: string;
  linkStyles?: string;
  buttonType: "dashed" | "default" | "primary";
};

const PublicProfileRedirectLink = ({
  user,
  linkText = "View Profile",
  isButton,
  buttonType = "default",
  buttonStyles,
  linkStyles,
}: Props) => {
  return (
    <>
      {isButton ? (
        <Link
          className={linkStyles}
          href={`/profile/${user?.id || user?._id}?name=${user?.name}&email=${
            user?.email
          }`}
        >
          <Button className={buttonStyles} type={buttonType}>
            {linkText}
          </Button>
        </Link>
      ) : (
        <Link
          className={linkStyles}
          href={`/profile/${user?.id}?name=${user?.name}&email=${user?.email}`}
        >
          {linkText}
        </Link>
      )}
    </>
  );
};

export default PublicProfileRedirectLink;
