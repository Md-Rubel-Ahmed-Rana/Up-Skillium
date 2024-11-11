/* eslint-disable @next/next/no-img-element */
import { ICourseProgress } from "@/types/studentProgress.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { Button, Card, Progress } from "antd/lib";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

import Link from "next/link";

const { Meta } = Card;

type Props = {
  course: ICourseProgress;
};

const MyCourseCard = ({ course }: Props) => {
  const isCompleted = course?.completionPercentage === 100;

  const routePath = `/classes/course/${course?.course?.id}/module/${
    course?.lastCompletedLesson?.module
  }/lesson/${course?.lastCompletedLesson?.id}/${makeLessonTitleAsParamsUrl(
    course?.lastCompletedLesson?.title
  )}`;

  return (
    <Card
      cover={
        <img
          className="max-h-40 h-full"
          alt={course?.course?.title}
          src={
            course?.course?.image ||
            "https://firebasestorage.googleapis.com/v0/b/up-skillium.appspot.com/o/up-skillium%2Fassets%2Ffallback-image.png?alt=media&token=c3cb9e52-a43e-4666-a534-216a99c60a88"
          }
        />
      }
      actions={[
        <Link href={routePath} key={"1"}>
          <Button type="primary">Continue Classes</Button>
        </Link>,
        <Link
          href={`/courses/details/${course?.course?.id}?courseId=${course?.course?.id}&courseTitle=${course?.course?.title}`}
          key={"2"}
        >
          <Button>Course Outline</Button>
        </Link>,
      ]}
      className="shadow-md flex flex-col justify-between"
    >
      <Meta title={course?.course?.title} />

      <div className="mt-3">
        <Progress
          percent={course?.completionPercentage}
          size={["100%", 15]}
          status={isCompleted ? "success" : "active"}
        />
        {isCompleted ? (
          <div className="flex items-center justify-center text-green-600 mt-2">
            <FaRegCheckCircle className="mr-2 text-xl" />
            <Meta description="Course Completed" />
          </div>
        ) : (
          <div className="flex items-center justify-center text-yellow-500 mt-2">
            <RxCrossCircled className="mr-2 text-xl" />
            <Meta description="Course Not Completed" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MyCourseCard;
