import { IGetLesson, ILesson } from "@/types/lesson.type";
import { Button } from "antd/lib";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

type Props = {
  lesson: ILesson | IGetLesson;
  shouldAddIcon?: boolean;
  isButton: boolean;
  buttonSize?: "small" | "middle" | "large";
  buttonStyles?: string;
  linkStyles?: string;
  iconSize?: number;
};

const EditLesson = ({
  lesson,
  shouldAddIcon = true,
  isButton,
  buttonSize = "middle",
  buttonStyles,
  linkStyles = "p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition",
  iconSize = 16,
}: Props) => {
  const path = `/dashboard/lesson/update/${lesson?.id}?id=${lesson?.id}&&lessonType=${lesson?.type}&lessonTitle=${lesson?.title}`;
  return (
    <>
      {isButton ? (
        <Link href={path} className={buttonStyles}>
          <Button className="w-full" type="primary" size={buttonSize}>
            Edit
          </Button>
        </Link>
      ) : (
        <Link href={path} className={linkStyles}>
          {shouldAddIcon ? <FiEdit size={iconSize} /> : "Edit"}
        </Link>
      )}
    </>
  );
};

export default EditLesson;
