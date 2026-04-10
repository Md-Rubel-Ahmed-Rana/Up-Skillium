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
  const href = `/dashboard/live-classes/edit/${liveClass?.id}?title=${
    liveClass?.title
  }&course=${liveClass?.course?.title}&instructor=${
    liveClass?.instructor?.name
  }&startDateTime=${liveClass?.startDateTime}&endDateTime=${
    liveClass?.endDateTime
  }&meetingLink=${liveClass?.meetingLink}&topics=${liveClass?.topics?.join(
    ","
  )}&tags=${liveClass?.tags?.join(",")}`;
  return (
    <>
      {isButton ? (
        <Link className={`${buttonStyles}`} href={href}>
          <Button type={buttonType} size={buttonSize} className="w-full">
            {editText}
          </Button>
        </Link>
      ) : (
        <Link className={`${linkStyles}`} href={href}>
          {editText}
        </Link>
      )}
    </>
  );
};

export default LiveClassEdit;
