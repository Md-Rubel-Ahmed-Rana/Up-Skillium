import { IGetLiveClass } from "@/types/liveClass.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  liveClass: IGetLiveClass;
  editText?: string;
  isButton?: boolean;
  buttonStyles?: string;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  buttonSize?: "small" | "middle" | "large";
  linkStyles?: string;
};

const LiveClassEdit = ({
  liveClass,
  editText = "Edit",
  isButton = true,
  buttonStyles = "w-full",
  buttonType = "primary",
  buttonSize = "small",
  linkStyles = "w-full",
}: Props) => {
  return (
    <>
      {isButton ? (
        <Link
          className={`${buttonStyles}`}
          href={`/dashboard/live-classes/edit/${liveClass?.id}`}
        >
          <Button type={buttonType} size={buttonSize} className="w-full">
            {editText}
          </Button>
        </Link>
      ) : (
        <Link
          className={`${linkStyles}`}
          href={`/dashboard/live-classes/edit/${liveClass?.id}`}
        >
          {editText}
        </Link>
      )}
    </>
  );
};

export default LiveClassEdit;
