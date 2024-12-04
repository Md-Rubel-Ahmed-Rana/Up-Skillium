import { ICourse } from "@/types/course.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  course: ICourse;
  text: string;
  isButton: boolean;
  buttonStyles?: string;
  linkStyles?: string;
  buttonSize?: "large" | "small" | "middle";
  buttonType?: "primary" | "dashed" | "default";
};

const CourseDetailsRedirectButton = ({
  course,
  text,
  buttonSize,
  buttonStyles,
  linkStyles,
  isButton,
  buttonType,
}: Props) => {
  return (
    <>
      {isButton ? (
        <Link
          href={`/courses/details/${course?.id}?courseId=${
            course?.id
          }&courseTitle=${course.title}&category=${
            course?.category
          }&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
        >
          <Button
            size={buttonSize}
            type={buttonType}
            className={buttonStyles}
            key={"2"}
          >
            {text}
          </Button>
        </Link>
      ) : (
        <Link
          className={linkStyles}
          href={`/courses/details/${course?.id}?courseId=${
            course?.id
          }&courseTitle=${course.title}&category=${
            course?.category
          }&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
        >
          {text}
        </Link>
      )}
    </>
  );
};

export default CourseDetailsRedirectButton;
