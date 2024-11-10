/* eslint-disable @next/next/no-img-element */
import { ICourseProgress } from "@/types/studentProgress.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { Button, Card, Progress } from "antd/lib";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";

const { Meta } = Card;

type Props = {
  course: ICourseProgress;
};

const MyCourseCard = ({ course }: Props) => {
  const isCompleted = course?.completionPercentage === 100;

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={course?.course?.title} src={course?.course?.image} />}
      actions={[
        <Link
          href={`/classes/${course?.course?.id}/${
            course?.lastCompletedLesson?.id
          }/${makeLessonTitleAsParamsUrl(course?.lastCompletedLesson?.title)}`}
          key={"1"}
        >
          <Button type="primary">Continue Classes</Button>
        </Link>,
        <Link
          href={`/courses/details/${course?.course?.id}?courseId=${course?.course?.id}&courseTitle=${course?.course?.title}`}
          key={"2"}
        >
          <Button>Course Outline</Button>
        </Link>,
      ]}
    >
      <Meta title={course?.course?.title} />

      <div className="mt-3">
        <Progress
          percent={course?.completionPercentage}
          size={[250, 15]}
          status={isCompleted ? "success" : "active"}
        />
        {isCompleted && (
          <div className="flex items-center justify-center text-green-600 mt-2">
            <FaRegCheckCircle className="mr-2 text-xl" />
            <span className="text-xl font-semibold">Course Completed</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MyCourseCard;
