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
          href={`/dashboard/live-classes/edit/${liveClass?.id}?title=${
            liveClass?.title
          }&course=${liveClass?.course?.title}&instructor=${
            liveClass?.instructor?.name
          }&startDateTime=${liveClass?.startDateTime}&endDateTime=${
            liveClass?.endDateTime
          }&duration=${liveClass?.duration}&meetingLink=${
            liveClass?.meetingLink
          }&topics=${liveClass?.topics?.join(",")}&tags=${liveClass?.tags?.join(
            ","
          )}`}
        >
          <Button type={buttonType} size={buttonSize} className="w-full">
            {editText}
          </Button>
        </Link>
      ) : (
        <Link
          className={`${linkStyles}`}
          href={`/dashboard/live-classes/edit/${liveClass?.id}?title=${
            liveClass?.title
          }&course=${liveClass?.course?.title}&instructor=${
            liveClass?.instructor?.name
          }&startDateTime=${liveClass?.startDateTime}&endDateTime=${
            liveClass?.endDateTime
          }&duration=${liveClass?.duration}&meetingLink=${
            liveClass?.meetingLink
          }&topics=${liveClass?.topics?.join(",")}&tags=${liveClass?.tags?.join(
            ","
          )}`}
        >
          {editText}
        </Link>
      )}
    </>
  );
};

export default LiveClassEdit;
