/* eslint-disable @next/next/no-img-element */
import { fallbackImageUrl } from "@/constants/fallback";
import { ICourse } from "@/types/course.type";
import { Button, Card, Image } from "antd/lib";
import Link from "next/link";

const { Meta } = Card;

type Props = {
  course: ICourse;
};

const ManageCourseCard = ({ course }: Props) => {
  return (
    <Card
      className="border shadow-lg"
      styles={{ body: { padding: "10px" } }}
      cover={
        course?.image ? (
          <img
            alt="course thumbnail"
            src={course?.image}
            className="h-[200px]"
          />
        ) : (
          <Image
            src="error"
            height={200}
            fallback={fallbackImageUrl}
            preview={false}
            alt="Placeholder Image"
          />
        )
      }
      actions={[
        <Link
          href={`/dashboard/course/modules-lessons/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
          key={"1"}
        >
          <Button
            type="default"
            className="w-[90%] bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Classes
          </Button>
        </Link>,
        <Link
          href={`/dashboard/course/outlines/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
          key={"2"}
        >
          <Button className="w-[90%] bg-green-500 text-white" type="default">
            Outlines
          </Button>
        </Link>,
        <Link
          href={`/dashboard/course/details/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
          key={"3"}
        >
          <Button type="primary" className="w-[90%]">
            Details
          </Button>
        </Link>,
      ]}
    >
      <Meta className="pb-3" title={course?.title} />
      <Meta
        className="pb-3"
        title={`Status: ${course?.status.toUpperCase()}`}
      />
    </Card>
  );
};

export default ManageCourseCard;
